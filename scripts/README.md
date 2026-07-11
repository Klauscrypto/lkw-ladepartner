# Blog-Automation — lkw-ladepartner.de

Erzeugt SEO-Fachartikel als Markdown in `src/content/blog/` über die Anthropic-API.
Die Artikel folgen dem Content-Collection-Schema aus `src/content.config.ts` und werden
beim nächsten `npm run build` automatisch als Seiten unter `/blog/<slug>/` gerendert —
inklusive Article-, FAQ- und Breadcrumb-Schema.

## Einrichtung

```bash
pip install anthropic
export ANTHROPIC_API_KEY="sk-ant-..."
```

## Verwendung

```bash
# alle offenen Themen aus blog_topics.json erzeugen (vorhandene werden übersprungen)
python scripts/blog_generator.py

# nur ein Thema
python scripts/blog_generator.py --slug mcs-vs-ccs-ladestandards-lkw

# nur den Plan ansehen (keine API, nichts geschrieben)
python scripts/blog_generator.py --dry-run

# vorhandene Artikel überschreiben
python scripts/blog_generator.py --force

# anderes Modell verwenden
python scripts/blog_generator.py --model claude-sonnet-5

# danach bauen
npm run build
```

## Neue Themen ergänzen

In `scripts/blog_topics.json` einen Eintrag in `topics` hinzufügen:

```json
{
  "slug": "eindeutiger-url-slug",
  "title": "Artikeltitel (H1)",
  "keyword": "haupt keyword",
  "cluster": "Technik & Infrastruktur",
  "intent": "informational",
  "target_words": 1000,
  "outline": ["Abschnitt 1", "Abschnitt 2", "Fazit"],
  "internal_links": [["/#rechner", "Förderrechner"]],
  "related": ["slug-eines-anderen-artikels"]
}
```

- **slug** wird zum Dateinamen und zur URL.
- **internal_links** werden dem Modell zum natürlichen Einbau vorgegeben (plus die globalen
  aus `defaults.internal_links_global`). Es erfindet keine anderen internen URLs.
- **related** steuert die „Weiterlesen"-Boxen; nur bereits existierende Slugs verwenden.

## Qualitätssicherung

Das Skript hält die Marken- und Faktenvorgaben im System-Prompt fest (u. a. Förder-Eckwerte
mit „ohne Gewähr"). Trotzdem gilt: **vor Veröffentlichung gegenlesen** — besonders Förder- und
Fristangaben gegen den aktuellen BMV-Aufruf prüfen. Die Ausgabe ist Markdown; Anpassungen
lassen sich direkt in der erzeugten `.md`-Datei vornehmen.

## Wie es technisch funktioniert

1. Liest `blog_topics.json`, überspringt bereits vorhandene Slugs.
2. Baut je Thema einen Prompt (Titel, Keyword, Gliederung, interne Links, Ziel-Umfang).
3. Fordert von der API striktes JSON an (`description`, `body_markdown`, `faq`).
4. Setzt daraus valides YAML-Frontmatter + Markdown zusammen und schreibt die Datei.
5. Astro (glob-Loader) zieht die Datei beim Build automatisch ein.

---

## Automatisierung (GitHub Actions)

Zwei Workflows liegen unter `.github/workflows/`:

**`blog-autopublish.yml`** — erzeugt zeitgesteuert Artikel und öffnet sie als **Pull Request** zur Freigabe:
- Läuft montags 06:00 UTC (oder manuell per „Run workflow" mit Eingaben `limit`/`force`).
- Generiert standardmäßig **einen** neuen Artikel pro Lauf (`--limit 1`), baut die Seite zur
  Validierung und öffnet einen Pull Request mit dem Entwurf (Review-Checkliste im PR-Text).
- **Kein automatischer Deploy** — der Artikel geht erst live, wenn du den PR nach `main` mergst.
  Dann übernimmt `deploy.yml`.
- Ist die Warteschlange leer, wird kein PR erstellt (idempotent).

> Einmalig aktivieren: **Settings → Actions → General → Workflow permissions →**
> „Allow GitHub Actions to create and approve pull requests".

**`deploy.yml`** — baut und deployt bei jedem Push auf `main` (normale CI/CD).

### Benötigte Secrets (Repo → Settings → Secrets and variables → Actions)
| Name | Zweck |
|------|-------|
| `ANTHROPIC_API_KEY` | Artikelerzeugung |
| `HETZNER_HOST` | IP/Hostname des VPS |
| `HETZNER_USER` | SSH-Benutzer |
| `HETZNER_SSH_KEY` | privater SSH-Key (ed25519) |
| `HETZNER_PATH` | Zielverzeichnis auf dem Server |

Optionale Variable `BLOG_MODEL` überschreibt das Standardmodell (`claude-sonnet-5`).

### Manuell auslösen
Actions-Tab → „Blog auto-publish & deploy" → „Run workflow" → `limit` z. B. auf `6` setzen,
um die gesamte Warteschlange auf einmal zu erzeugen.
