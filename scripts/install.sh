#!/usr/bin/env bash
set -euo pipefail

# Symlinks every skill in this repo into the local harness skill directories,
# so edits here are live everywhere. Re-run after adding, removing, or
# renaming a skill.
#
#   ~/.agents/skills  Codex, Cursor, and other Agent Skills harnesses
#   ~/.claude/skills  Claude Code (skipped when it is a symlink to the above)
#
# A real directory already sitting at a target is left alone unless you pass
# --replace, which moves it to ~/.agents/skills-replaced/<timestamp>/ first.

REPO="$(cd "$(dirname "$0")/.." && pwd)"
REPLACE=false
[ "${1:-}" = "--replace" ] && REPLACE=true
BACKUP="$HOME/.agents/skills-replaced/$(date +%Y%m%d-%H%M%S)"

seen=()
for DEST in "$HOME/.agents/skills" "$HOME/.claude/skills"; do
  mkdir -p "$DEST"
  resolved="$(readlink -f "$DEST")"
  case "$resolved" in
    "$REPO" | "$REPO"/*)
      echo "error: $DEST resolves into this repo ($resolved). Remove that symlink first." >&2
      exit 1
      ;;
  esac
  if [ "${#seen[@]}" -gt 0 ] && printf '%s\n' "${seen[@]}" | grep -qxF "$resolved"; then
    echo "skip $DEST (same directory as an earlier destination)"
    continue
  fi
  seen+=("$resolved")

  for src in "$REPO"/skills/*/; do
    src="${src%/}"
    name="$(basename "$src")"
    target="$DEST/$name"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      if ! $REPLACE; then
        echo "keep $target (real directory; pass --replace to swap it for a link)"
        continue
      fi
      mkdir -p "$BACKUP"
      mv "$target" "$BACKUP/$name"
      echo "moved $target -> $BACKUP/$name"
    fi
    ln -sfn "$src" "$target"
    echo "linked $target -> $src"
  done
done
