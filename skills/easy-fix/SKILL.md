---
name: easy-fix
description: Use when fixing findings from a review, bot thread, CI failure or when the user asks for an "easy fix".
---

# Easy Fix

Aim for the easiest correct fix: small and obvious to a reviewer.

Confirm the finding is real by reproducing it or tracing the code path, unless you already verified it. If it is not real, change nothing and say why in one line.
If tracing does not find the cause, switch to the `root-cause` skill instead of guessing.

Apply these fix rules:

- Fix the cause, not the symptom. Add a guard only for legitimate states; prefer deleting or narrowing code over adding guards, flags or special cases.
- Check the rest of the diff (or the touched module for an existing bug) for the same cause and fix those too. List occurrences outside that scope instead of expanding it.
- Touch only what the fix needs. Make no drive-by cleanups, renames or reformatting.
- A small local refactor is fine if it simplifies the fix. If the correct fix needs an interface change or redesign, stop, report the cause and required change, and do not patch around it.

Before calling it fixed:

- Run the reproduction again when you have one. It must pass.
- Never weaken a check to make it pass.
- Run lint, typecheck and the touched tests.
