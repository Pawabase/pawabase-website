#!/usr/bin/env python3
"""Build a searchable path/title catalog from a Pawabase docs checkout."""

from __future__ import annotations

import argparse
import re
import subprocess
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TITLE = re.compile(r'^title:\s*"(.*)"\s*$', re.MULTILINE)


def catalog(docs: Path) -> str:
    pages: dict[str, list[tuple[str, str]]] = defaultdict(list)
    for page in sorted(docs.rglob("*.mdx")):
        relative = page.relative_to(docs).as_posix()
        if "node_modules" in page.parts or "dist" in page.parts:
            continue
        frontmatter = page.read_text().split("---", 2)
        title_match = TITLE.search(frontmatter[1]) if len(frontmatter) > 2 else None
        title = title_match.group(1) if title_match else page.stem.replace("-", " ").title()
        group = relative.split("/", 1)[0] if "/" in relative else "root"
        pages[group].append((relative, title))

    revision = subprocess.run(
        ["git", "-C", str(docs), "rev-parse", "--short", "HEAD"],
        capture_output=True,
        text=True,
        check=False,
    ).stdout.strip() or "unknown"
    lines = [
        "# Pawabase docs catalog",
        "",
        f"Generated from the docs checkout at commit `{revision}`. Use this only to find a page; the target deployment and installed SDK remain the contract. Paths are relative to [Pawabase docs](https://github.com/Pawabase/pawabase-docs).",
        "",
    ]
    for group, items in sorted(pages.items()):
        lines.extend([f"## {group}", ""])
        lines.extend(f"- `{path}` — {title}" for path, title in items)
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--docs", required=True, type=Path, help="Pawabase docs checkout")
    parser.add_argument("--check", action="store_true", help="fail if the catalog differs")
    args = parser.parse_args()
    if not args.docs.is_dir():
        parser.error(f"docs checkout not found: {args.docs}")
    expected = catalog(args.docs)
    output = ROOT / "references" / "docs-catalog.md"
    if args.check:
        if not output.exists() or output.read_text() != expected:
            print("Docs catalog is out of date; run build_catalog.py without --check.")
            return 1
        print("Docs catalog is current.")
        return 0
    output.write_text(expected)
    print(f"Wrote {output}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
