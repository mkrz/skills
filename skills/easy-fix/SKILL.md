---
name: easy-fix
description: Use when fixing findings in a review loop, bot thread, CI or when the user asks for an "easy fix".
---

# Easy Fix

Aim for the easiest correct fix: small and obvious to a reviewer.

Unless you've already verified the finding yourself, confirm it's real by reproducing it or tracing the code path. If it isn't real, change nothing and say why in one line.
If tracing doesn't find the cause, switch to the `root-cause` skill instead of guessing.

Fix the cause, not the symptom. A guard is a fix only when the state it handles is legitimate; prefer a fix that deletes or narrows code over one that adds guards, flags or special cases.
Check the rest of the diff (or the touched module when fixing an existing bug) for the same cause and fix those too. List any occurrences outside that scope instead of expanding it.
Touch only what the fix needs and don't change behavior beyond it. No drive-by cleanups, renames or reformatting.
A small local refactor is fine if it makes the fix simpler. If the correct fix needs more, like an interface change or a redesign, stop. Say what the root cause is and what the real fix would take, and don't patch around it.

Treat the fix as new code before calling it fixed:

- Run the reproduction again after the fix when you have one. It must pass.
- Never pass a check by weakening it.
- Run lint, typecheck and the touched tests.
