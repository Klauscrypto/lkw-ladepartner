#!/usr/bin/env python3
"""
Blog-Generator für lkw-ladepartner.de
-------------------------------------
Erzeugt SEO-Fachartikel als Markdown-Dateien in src/content/blog/ — passend zum
Astro-Content-Collection-Schema (content.config.ts). Die Themen-Warteschlange
steht in scripts/blog_topics.json.

Nutzung:
  export ANTHROPIC_API_KEY="sk-ant-..."
  python scripts/blog_generator.py                 # alle offenen Themen
  python scripts/blog_generator.py --slug mcs-vs-ccs-ladestandards-lkw
  python scripts/blog_generator.py --dry-run       # nur Plan zeigen, nichts schreiben, keine API
  python scripts/blog_generator.py --force         # vorhandene Artikel überschreiben
  python scripts/blog_generator.py --model claude-sonnet-5

Nach dem Lauf: `npm run build` — der glob-Loader zieht neue Artikel automatisch ein.
"""

import argparse
import datetime as dt
import json
import os
import re
import sys
from pathlib import Path

# ---- Pfade ----
ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src" / "content" / "blog"
TOPICS_FILE = Path(__file__).resolve().parent / "blog_topics.json"

BRAND_CONTEXT = (
    "SOMV Project Consulting GmbH (Website lkw-ladepartner.de) ist Komplettanbieter für "
    "Depot-Elektrifizierung von Nutzfahrzeugflotten und offizieller Virta-Reseller. "
    "Leistungen aus einer Hand: Netzanschluss & Übergabestation, Photovoltaik, Batteriespeicher, "
    "DC-Ladepunkte, Lastmanagement, Fördermanagement (BMV, 500 €/kW). Zielgruppe: Speditionen, "
    "Handwerks- und Bauflotten, Kommunen in Niederbayern (Deggendorf, Passau, Regensburg, "
    "Straubing, Landshut)."
)

SYSTEM_PROMPT = (
    "Du bist erfahrener Fachredakteur für Lkw-Ladeinfrastruktur und schreibst deutschsprachige "
    "SEO-Fachartikel (B2B) für den folgenden Anbieter:\n" + BRAND_CONTEXT + "\n\n"
    "Schreibregeln:\n"
    "- Sachlich, präzise, seriös. Keine Werbe-Superlative, keine erfundenen Zahlen.\n"
    "- Bei Förderangaben grundsätzlich relativieren (z. B. 'Richtwert', 'ohne Gewähr', 'maßgeblich "
    "ist der jeweilige Förderaufruf'). Verlässliche Eckwerte: BMV fördert 500 €/kW; rund 1 Mrd. € "
    "über vier Jahre; Netzanschluss, Speicher und Lastmanagement sind förderfähig; Depotladen ist "
    "der häufigste Anwendungsfall.\n"
    "- Struktur mit ##-Überschriften (H2), kurze Absätze, gelegentlich Aufzählungen. KEIN H1 "
    "(der Titel wird separat gesetzt). Kein Frontmatter, keine Code-Fences.\n"
    "- Baue die vorgegebenen internen Links als natürliche Markdown-Links ein "
    "([Ankertext](url)). Erfinde keine anderen internen URLs.\n"
    "- Deutscher Fließtext, du-neutral (Sie-Form).\n"
    "Gib AUSSCHLIESSLICH gültiges JSON zurück, ohne Vorwort und ohne Markdown-Codeblock."
)


def build_user_prompt(topic: dict, target_words: int, links: list) -> str:
    outline = "\n".join(f"  - {h}" for h in topic.get("outline", []))
    linklist = "\n".join(f"  - {label} -> {url}" for url, label in links)
    return (
        f"Schreibe einen Artikel.\n\n"
        f"Titel (H1, NICHT im Text wiederholen): {topic['title']}\n"
        f"Haupt-Keyword (natürlich einbauen, nicht spammen): {topic['keyword']}\n"
        f"Themencluster: {topic.get('cluster','')}\n"
        f"Suchintention: {topic.get('intent','informational')}\n"
        f"Ziel-Umfang: ca. {target_words} Wörter.\n\n"
        f"Zu behandelnde Abschnitte (als H2, gern leicht umformulieren):\n{outline}\n\n"
        f"Diese internen Links natürlich einbauen:\n{linklist}\n\n"
        f"Antworte als JSON mit exakt diesen Feldern:\n"
        f'{{\n'
        f'  "description": "Meta-Description, max. 155 Zeichen, mit Keyword",\n'
        f'  "body_markdown": "Der Artikeltext in Markdown, beginnend mit einem Einleitungsabsatz, '
        f'dann ## H2-Abschnitte.",\n'
        f'  "faq": [{{"q": "Frage?", "a": "Antwort."}}, ... 3 bis 4 Einträge]\n'
        f'}}'
    )


def load_topics() -> dict:
    with open(TOPICS_FILE, encoding="utf-8") as f:
        return json.load(f)


def existing_slugs() -> set:
    if not BLOG_DIR.exists():
        return set()
    return {p.stem for p in BLOG_DIR.glob("*.md")}


def yaml_escape(s: str) -> str:
    """Sicheres Quoting für YAML-Doublequote-Strings."""
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def build_frontmatter(topic: dict, description: str, faq: list) -> str:
    today = dt.date.today().isoformat()
    lines = ["---"]
    lines.append(f"title: {yaml_escape(topic['title'])}")
    lines.append(f"description: {yaml_escape(description)}")
    lines.append(f"keyword: {yaml_escape(topic['keyword'])}")
    lines.append(f"pubDate: {today}")
    if topic.get("cluster"):
        lines.append(f"cluster: {yaml_escape(topic['cluster'])}")
    lines.append("faq:")
    for item in faq:
        lines.append(f"  - q: {yaml_escape(item['q'])}")
        lines.append(f"    a: {yaml_escape(item['a'])}")
    if topic.get("related"):
        lines.append("related:")
        for r in topic["related"]:
            lines.append(f"  - {yaml_escape(r)}")
    lines.append("---")
    return "\n".join(lines)


def parse_model_json(text: str) -> dict:
    """Robustes Parsen: entfernt evtl. Code-Fences und Vor-/Nachtext."""
    t = text.strip()
    t = re.sub(r"^```(?:json)?", "", t).strip()
    t = re.sub(r"```$", "", t).strip()
    # Falls trotzdem Text drumherum: erstes { bis letztes }
    if not t.startswith("{"):
        i, j = t.find("{"), t.rfind("}")
        if i != -1 and j != -1:
            t = t[i : j + 1]
    return json.loads(t)


def call_claude(model: str, system: str, user: str) -> str:
    try:
        import anthropic
    except ImportError:
        sys.exit("Fehlt: 'anthropic'. Installieren mit:  pip install anthropic")
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit("Umgebungsvariable ANTHROPIC_API_KEY ist nicht gesetzt.")
    client = anthropic.Anthropic(api_key=api_key)
    resp = client.messages.create(
        model=model,
        max_tokens=4000,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return "".join(block.text for block in resp.content if getattr(block, "type", "") == "text")


def generate_one(topic: dict, cfg: dict, args) -> bool:
    defaults = cfg.get("defaults", {})
    target_words = topic.get("target_words", defaults.get("target_words", 900))
    links = list(topic.get("internal_links", [])) + list(defaults.get("internal_links_global", []))
    # Duplikate raus (nach URL)
    seen, links_uniq = set(), []
    for url, label in links:
        if url not in seen:
            seen.add(url)
            links_uniq.append((url, label))

    out_path = BLOG_DIR / f"{topic['slug']}.md"

    if args.dry_run:
        print(f"  [DRY]  würde erzeugen: {out_path.relative_to(ROOT)}  (~{target_words} W., "
              f"{len(links_uniq)} interne Links, {len(topic.get('outline', []))} H2)")
        return True

    user = build_user_prompt(topic, target_words, links_uniq)
    print(f"  → generiere: {topic['slug']} … ", end="", flush=True)

    last_err = None
    for attempt in range(2):
        try:
            raw = call_claude(args.model, SYSTEM_PROMPT, user)
            data = parse_model_json(raw)
            description = data["description"].strip()
            body = data["body_markdown"].strip()
            faq = data.get("faq", [])
            if not body or not description or not faq:
                raise ValueError("unvollständige Antwort (body/description/faq)")
            fm = build_frontmatter(topic, description, faq)
            BLOG_DIR.mkdir(parents=True, exist_ok=True)
            out_path.write_text(fm + "\n\n" + body + "\n", encoding="utf-8")
            print(f"OK  ({len(body.split())} Wörter, {len(faq)} FAQ)")
            return True
        except Exception as e:  # noqa: BLE001
            last_err = e
            if attempt == 0:
                print("neu versuchen … ", end="", flush=True)
    print(f"FEHLER: {last_err}")
    return False


def main():
    ap = argparse.ArgumentParser(description="Blog-Generator für lkw-ladepartner.de")
    ap.add_argument("--slug", help="nur dieses Thema erzeugen")
    ap.add_argument("--model", default=os.environ.get("BLOG_MODEL", "claude-sonnet-5"),
                    help="Anthropic-Modell (Default: claude-sonnet-5)")
    ap.add_argument("--dry-run", action="store_true", help="nur Plan zeigen, nichts schreiben, keine API")
    ap.add_argument("--force", action="store_true", help="vorhandene Artikel überschreiben")
    ap.add_argument("--limit", type=int, default=0,
                    help="max. Anzahl neuer Artikel pro Lauf (0 = unbegrenzt)")
    args = ap.parse_args()

    cfg = load_topics()
    topics = cfg["topics"]
    if args.slug:
        topics = [t for t in topics if t["slug"] == args.slug]
        if not topics:
            sys.exit(f"Kein Thema mit slug '{args.slug}' in blog_topics.json.")

    have = existing_slugs()
    queue = [t for t in topics if args.force or t["slug"] not in have]
    skipped = [t for t in topics if not args.force and t["slug"] in have]
    if args.limit and args.limit > 0:
        queue = queue[: args.limit]

    print(f"Blog-Generator · Modell: {args.model} · Zielordner: {BLOG_DIR.relative_to(ROOT)}")
    if skipped:
        print(f"Übersprungen (existiert bereits): {', '.join(t['slug'] for t in skipped)}")
    if not queue:
        print("Nichts zu tun. (Mit --force vorhandene überschreiben.)")
        return

    print(f"Zu erzeugen: {len(queue)} Artikel\n")
    ok = 0
    for t in queue:
        if generate_one(t, cfg, args):
            ok += 1
    print(f"\nFertig: {ok}/{len(queue)} erzeugt. Danach `npm run build` ausführen.")


if __name__ == "__main__":
    main()
