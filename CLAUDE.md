# CLAUDE.md — Projektkontext für Claude Code

Diese Datei ist der Einstieg für Claude Code. Sie beschreibt Zweck, Aufbau, Konventionen,
Deployment und offene Punkte des Projekts **lkw-ladepartner.de**.

## 1. Was ist das

Marketing-/Lead-Website für **SOMV Project Consulting GmbH** rund um **Lkw-Depotladen**
(Ladeinfrastruktur für E-Nutzfahrzeuge auf dem Betriebshof). Positionierung: Komplettanbieter
aus Netzanschluss/Übergabestation, PV, Speicher, Ladepunkten und Fördermanagement; Ladeplattform
vom Partner **Virta** (White-Label); Ladehardware herstelleroffen (u. a. Zebra BOOST-E, XCHARGE C7).

Produktschwester zu `trafo-uebergabestation.de`. Zielregion: Niederbayern.

## 2. Tech-Stack

- **Astro 5** (statisch, `output` default = static), Content Collections für den Blog.
- **@astrojs/sitemap** für Sitemap.
- **Self-hosted Fonts** via `@fontsource` (Space Grotesk, IBM Plex Sans, IBM Plex Mono) —
  **kein** Google-Fonts-CDN (DSGVO). Diese Regel ist bewusst; nicht auf CDN umstellen.
- Kein CSS-Framework; ein gemeinsames Stylesheet `src/styles/landing.css` + scoped Styles je Komponente.
- Kontaktformular-Backend: **PHP** (`public/send.php`) — der Zielserver muss PHP-Mail bereitstellen.
- Deploy: GitHub Actions → rsync auf **Hetzner VPS**.

## 3. Befehle

```bash
npm ci            # Abhängigkeiten
npm run dev       # lokaler Dev-Server
npm run build     # Produktion nach dist/
npm run preview   # gebautes dist/ lokal ansehen
```

Node 20 empfohlen (siehe Workflows).

## 4. Struktur (Kurzüberblick)

```
src/
  i18n/ui.ts                  # ZENTRALE Übersetzungen DE/EN + brand-Links. Fast aller Text lebt hier.
  data/
    regions.ts                # 5 Standorte (Deggendorf, Passau, Regensburg, Straubing, Landshut) + Geo
    hardware.ts               # Ladehardware-Produkte (Specs als Fakten, eigene Texte)
  components/
    Landing.astro             # Startseite (Hero, Leistungen, System, Rechner, Ablauf, FAQ, Kontaktform)
    RegionLanding.astro       # Standort-Seiten
    HardwareLanding.astro     # Ladehardware-Seite
    ContactForm.astro         # Kontaktformular (Consent, Honeypot, Client-Validierung, fetch → /send.php)
  layouts/
    BlogPost.astro            # Artikel-Layout (Prosa, FAQ, Related, Schema)
    Legal.astro               # Layout für Impressum/Datenschutz
  pages/
    index.astro               # DE Start  → <Landing lang="de" />
    en/index.astro            # EN Start
    standort/[slug].astro     # DE Standorte (getStaticPaths über regions)
    en/locations/[slug].astro # EN Standorte
    ladehardware/index.astro  # DE Hardware
    en/charging-hardware/index.astro  # EN Hardware
    blog/index.astro          # Blog-Übersicht
    blog/[...slug].astro       # Blog-Artikel (Content Collection)
    impressum.astro, datenschutz.astro
  content/blog/*.md           # Blog-Artikel (Markdown + Frontmatter)
  content.config.ts           # Schema der Blog-Collection
  styles/landing.css          # gemeinsames Stylesheet inkl. Mobile-Breakpoints
public/
  send.php                    # Mail-Handler des Kontaktformulars
  robots.txt, favicon.svg, og-image.png
scripts/                      # Blog-Automation (siehe scripts/README.md)
.github/workflows/            # deploy.yml (Push→Deploy), blog-autopublish.yml (PR-Entwurf)
```

## 5. i18n-System

- Sprachen: **DE** (Default, ohne URL-Präfix, unter `/`) und **EN** (unter `/en/`). Konfig in `astro.config.mjs`.
- **Aller sichtbarer Text steht in `src/i18n/ui.ts`** als `ui.de` / `ui.en`. Komponenten bekommen
  `lang` als Prop und lesen `ui[lang]`. Neue Texte immer dort in beiden Sprachen ergänzen.
- `brand` (in `ui.ts`) enthält die Links der Unternehmensgruppe und `email`.
- hreflang-Alternates + Canonical werden je Seite gesetzt.

## 6. So erweitert man Inhalte

- **Neuer Blog-Artikel (manuell):** Markdown-Datei in `src/content/blog/` nach dem Schema in
  `content.config.ts` (title, description, keyword, pubDate, cluster?, faq[], related[]). Build zieht sie automatisch.
- **Neuer Blog-Artikel (automatisch):** Thema in `scripts/blog_topics.json` eintragen und
  `python scripts/blog_generator.py` laufen lassen (braucht `ANTHROPIC_API_KEY`). Details in `scripts/README.md`.
- **Neuer Standort:** Objekt in `src/data/regions.ts` ergänzen (slug, name, plz, lat, lng, de/en-Texte).
  Routen und Sitemap entstehen automatisch. Startseiten-Footer verlinkt alle Standorte.
- **Neue Hardware:** Objekt in `src/data/hardware.ts` ergänzen (brand, name, specs, de/en-Texte).
- **Übersetzung/Text ändern:** in `src/i18n/ui.ts`.

## 7. Konventionen / Leitplanken (bitte einhalten)

- **DSGVO:** keine externen Ressourcen ohne Consent. Fonts bleiben self-hosted, kein Tracking,
  kein Cookie-Banner nötig. Wenn Analytics/Karten/Formular-Drittdienste dazukommen → Consent + Datenschutztext erweitern.
- **Mobile:** überlauffrei ab 320 px halten. Breakpoints in `landing.css` (`920 / 560 / 400 / 345 px`).
  Lange Komposita brauchen `overflow-wrap`. Nach Layout-Änderungen mit schmaler Viewport-Breite gegenprüfen.
- **Barrierefreiheit:** Skip-Link, Fokus-Styles, `prefers-reduced-motion` sind vorhanden — beibehalten.
- **Faktenvorsicht:** Förder-/Fristangaben (BMV 500 €/kW etc.) sind mit „ohne Gewähr" gekennzeichnet;
  vor Veröffentlichung gegen den aktuellen Förderaufruf prüfen.
- **Fremdmarken:** XCHARGE/Zebra sowie deren Datenblätter/Bilder nur mit Partner-Freigabe öffentlich zeigen.

## 8. Deployment

Zwei Workflows in `.github/workflows/`:

- **`deploy.yml`** — Push auf `main` → Build → rsync nach Hetzner.
- **`blog-autopublish.yml`** — zeitgesteuert; generiert einen Artikel und öffnet einen **Pull Request**
  (kein Auto-Deploy). Merge nach `main` → `deploy.yml` deployt.

Benötigte GitHub-Secrets: `ANTHROPIC_API_KEY`, `HETZNER_HOST`, `HETZNER_USER`, `HETZNER_SSH_KEY`,
`HETZNER_PATH`. Optionale Variable `BLOG_MODEL` (Default `claude-sonnet-5`).
Einmalig: „Allow GitHub Actions to create and approve pull requests" aktivieren (für den PR-Workflow).

Der Webserver muss **PHP** für `send.php` bereitstellen; in `send.php` die Absenderadresse
(`website@lkw-ladepartner.de`) auf eine reale Domain-Adresse setzen.

## 9. Domains

- Primär: `lkw-ladepartner.de` (+ `.com`), SEO-Weiterleitung `lkw-depotladen.de`.
- Verlinkte Gruppe: `somv-project.de`, `trafo-uebergabestation.de`, `solar-energie-partner.de`,
  `waerme-kraft.de`. (Achtung: offizielle SOMV-Seite ist **somv-project.de**, nicht somv.de.)

## 10. Offene Punkte / TODO

- [ ] Domain registrieren, live schalten, Search Console + Bing + Sitemap einreichen.
- [ ] Google-Unternehmensprofil (Text liegt separat als `Google-Unternehmensprofil_Texte.md`).
- [ ] Impressum ist mit echten Daten befüllt; **Datenschutz anwaltlich prüfen** (Hinweis-Box entfernen, wenn erledigt).
- [ ] „Offizieller Virta Reseller"-Wording erst nach Vertrag freischalten.
- [ ] Partner-Freigabe für XCHARGE/Zebra (Markennennung, Bilder, Datenblatt-Download) klären.
- [ ] „Datenblatt anfordern"-Button bzw. echte Datenblatt-PDFs auf der Hardware-Seite (nach Freigabe).
- [ ] `send.php`: Absenderadresse setzen; ggf. auf SMTP/Transaktionsmailer umstellen.
- [ ] Restliche 6 Blog-Artikel per Skript generieren; EN-Impressum/Datenschutz optional.
- [ ] Optional: DSGVO-freundliches Analytics (Plausible/Matomo), Lighthouse-/Link-Check im PR.
- [ ] Echte Projektfotos (WebP, Alt-Texte) statt CSS-Grafik; Case Study nach Projekt 1.

## 11. Nützliche Fakten (verlässlich, nicht neu erfinden)

- BMV-Förderung: 500 €/kW netto Ladeleistung; ~1 Mrd. € über vier Jahre; Netzanschluss, Speicher,
  Lastmanagement sind förderfähig; Depotladen ist der häufigste Anwendungsfall.
- Firmendaten SOMV: Amtsgericht Kiel HRB 18295; GF Michael Volz, Sait Ögütmen; USt-IdNr DE 267 441 021;
  Sitz Westensee, Niederlassung Land-Au 8, 94469 Deggendorf; Tel. +49 991 38314070; info@somv-project.de.
