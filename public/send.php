<?php
/**
 * Kontaktformular-Handler für lkw-ladepartner.de
 * -----------------------------------------------
 * DSGVO-arm: verarbeitet nur die eingegebenen Felder, keine Cookies, kein Logging
 * personenbezogener Daten. Versendet die Anfrage per SMTP (Microsoft 365) an das Postfach.
 *
 * SMTP-Zugangsdaten liegen außerhalb des Webroots in /etc/lkw-ladepartner/smtp.env
 * (nur von www-data lesbar), nicht im Git-Repo.
 */

require __DIR__ . '/smtp_mailer.php';

header('Content-Type: application/json; charset=utf-8');

// Nur POST zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// --- SMTP-Konfiguration laden ---
$envPath = '/etc/lkw-ladepartner/smtp.env';
if (!is_readable($envPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_not_configured']);
    exit;
}
$env = parse_ini_file($envPath);
$smtpHost = $env['SMTP_HOST'] ?? '';
$smtpPort = (int) ($env['SMTP_PORT'] ?? 587);
$smtpUser = $env['SMTP_USER'] ?? '';
$smtpPass = $env['SMTP_PASS'] ?? '';

// --- Konfiguration ---
$to = 'info@somv-project.de';

// --- Eingaben einlesen ---
function field($k) { return isset($_POST[$k]) ? trim((string) $_POST[$k]) : ''; }
$name    = field('name');
$company = field('company');
$email   = field('email');
$phone   = field('phone');
$message = field('message');
$consent = field('consent');       // "on" wenn angehakt
$website = field('website');       // Honeypot – muss leer sein
$lang    = field('lang') === 'en' ? 'en' : 'de';

// --- Spam-Schutz: Honeypot ---
if ($website !== '') {
    // Bot erkannt: harmlos "ok" zurückgeben, aber nichts senden
    echo json_encode(['ok' => true]);
    exit;
}

// --- Validierung ---
$errors = [];
if ($name === '')  $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($message === '') $errors[] = 'message';
if ($consent !== 'on' && $consent !== '1' && $consent !== 'true') $errors[] = 'consent';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation', 'fields' => $errors]);
    exit;
}

// --- Länge begrenzen (einfacher Missbrauchsschutz) ---
$name    = mb_substr($name, 0, 120);
$company = mb_substr($company, 0, 160);
$phone   = mb_substr($phone, 0, 60);
$message = mb_substr($message, 0, 4000);

// --- Header-Injection verhindern ---
foreach (['name', 'email', 'company', 'phone'] as $v) {
    if (preg_match('/[\r\n]/', $$v)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'invalid_input']);
        exit;
    }
}

// --- Mail zusammenbauen ---
$subject = 'Neue Anfrage über lkw-ladepartner.de';
$body  = "Neue Kontaktanfrage:\n\n";
$body .= "Name:    {$name}\n";
$body .= "Firma:   {$company}\n";
$body .= "E-Mail:  {$email}\n";
$body .= "Telefon: {$phone}\n";
$body .= "Sprache: {$lang}\n\n";
$body .= "Nachricht:\n{$message}\n";

try {
    $mailer = new SmtpMailer($smtpHost, $smtpPort, $smtpUser, $smtpPass);
    $mailer->send(
        from: $smtpUser,
        fromName: 'SOMV Website',
        to: $to,
        replyTo: "{$name} <{$email}>",
        subject: $subject,
        body: $body
    );
    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    error_log('send.php SMTP-Fehler: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
