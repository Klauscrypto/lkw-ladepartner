# lkw-ladepartner.de

Mehrsprachige (DE/EN) Marketing- und Lead-Website für **SOMV Project Consulting GmbH** rund um
**Lkw-Depotladen** — gebaut mit **Astro 5**. Komplettanbieter-Story: Netzanschluss, PV, Speicher,
Ladepunkte und Förderung aus einer Hand; Ladeplattform von Virta; herstelleroffene Ladehardware.

> Projektkontext, Konventionen und offene Punkte stehen ausführlich in **`CLAUDE.md`**.

## Schnellstart

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview
```

Node 20 empfohlen.

## Was drin ist

- **21 Seiten:** Start (DE/EN), 5 Standorte × 2 Sprachen, Ladehardware (DE/EN),
  Blog-Übersicht + Artikel, Impressum, Datenschutz.
- **SEO:** Canonical, hreflang, Sitemap, robots.txt, Open Graph/Twitter, JSON-LD
  (Organization, LocalBusiness, Service, FAQPage, Product, Breadcrumb, Article).
- **DSGVO:** self-hosted Fonts, kein Tracking, kein Cookie-Banner nötig; Impressum + Datenschutz.
- **Kontaktformular** mit Consent + Honeypot (`src/components/ContactForm.astro`) und
  PHP-Handler (`public/send.php`).
- **Blog-Automation** (`scripts/`) — erzeugt Artikel über die Anthropic-API; siehe `scripts/README.md`.
- **CI/CD** (`.github/workflows/`) — Push→Deploy auf Hetzner; zeitgesteuerter Blog-PR-Workflow.

## Inhalte erweitern

- Text/Übersetzung: `src/i18n/ui.ts`
- Standort: `src/data/regions.ts`
- Hardware: `src/data/hardware.ts`
- Blog-Artikel: `src/content/blog/*.md` (oder per `scripts/blog_generator.py`)

## Deploy

GitHub Actions deployt bei Push auf `main` per rsync auf den Hetzner-VPS.
Benötigte Secrets und Details: siehe `CLAUDE.md` → „Deployment".
Der Server muss PHP für das Kontaktformular bereitstellen.

## Lizenz-/Rechtehinweis

Fremdmarken (XCHARGE, Zebra Electronics u. a.) und deren Datenblätter/Bilder nur mit
Partner-Freigabe öffentlich verwenden. Förderangaben ohne Gewähr.
