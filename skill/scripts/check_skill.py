#!/usr/bin/env python3
"""Check the skill: frontmatter, links, reachability of every reference, docs pages, and formatting."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r"\]\(([^)#]+)(?:#[^)]*)?\)")
DOC_PATH = re.compile(r"`([a-z][a-z0-9-]+(?:/[a-z0-9-]+)+\.mdx)`")
FRONTMATTER = re.compile(r"\A---\nname: ([^\n]+)\ndescription: ([^\n]+)\n---\n")
# Things that no longer exist and must not come back as advice.
RETIRED = [
    (re.compile(r"/functions/v1"), "the /functions/v1 route was removed"),
    (re.compile(r"\bpb\.functions\b|\bfunctions\.invoke\b"), "functions were removed; use flows or routes"),
    (re.compile(r"\b(MySQL|SQLite)\b"), "Pawabase is Postgres only"),
]
RETIRED_OK = re.compile(r"no MySQL|not plan for MySQL|Do not offer MySQL|There is no `/functions/v1`")


def check(docs: Path | None) -> list[str]:
    errors: list[str] = []
    skill = ROOT / "SKILL.md"
    body = skill.read_text()
    match = FRONTMATTER.match(body)
    if not match:
        errors.append("SKILL.md: expected frontmatter with name and description on one line each")
    else:
        name, description = match.groups()
        if name != "pawabase":
            errors.append(f"SKILL.md: name must be 'pawabase', found {name!r}")
        if len(description) > 1024:
            errors.append(f"SKILL.md: description is {len(description)} characters; keep it at most 1024")

    references = sorted((ROOT / "references").rglob("*.md"))
    files = [skill, ROOT / "README.md", *references]
    linked: set[Path] = set()
    for file in files:
        content = file.read_text()
        for target in LINK.findall(content):
            if "://" in target:
                continue
            path = (file.parent / target).resolve()
            if not path.exists():
                errors.append(f"{file.relative_to(ROOT)}: broken link {target}")
            linked.add(path)
        if docs is not None:
            for target in DOC_PATH.findall(content):
                if not (docs / target).exists():
                    errors.append(f"{file.relative_to(ROOT)}: missing docs page {target}")
        if file.name != "docs-catalog.md":
            for number, line in enumerate(content.splitlines(), 1):
                if RETIRED_OK.search(line):
                    continue
                for pattern, why in RETIRED:
                    if pattern.search(line):
                        errors.append(f"{file.relative_to(ROOT)}:{number}: {why}")
        for number, line in enumerate(content.splitlines(), 1):
            if line != line.rstrip():
                errors.append(f"{file.relative_to(ROOT)}:{number}: trailing whitespace")

    for reference in references:
        if reference.resolve() not in linked:
            errors.append(f"{reference.relative_to(ROOT)}: not linked from SKILL.md or another reference")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--docs", type=Path, help="local pawabase-docs checkout")
    args = parser.parse_args()
    errors = check(args.docs)
    if errors:
        print("\n".join(errors))
        return 1
    print("Pawabase skill links and references are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
