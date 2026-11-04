---
name: easy-fix
description: Use when fixing findings in a review loop, bot thread, CI or when the user asks for an "easy fix".
---

# Easy Fix

Aim for the easiest correct fix: small and obvious to a reviewer.

Unless you've already verified the finding yourself, confirm it's real by reproducing it or tracing the code path. If it isn't real, change nothing and say why in one line.
Fix the cause, not the symptom. Prefer a fix that deletes or narrows code over one that adds guards, flags or special cases.
Touch only what the fix needs and don't change behavior beyond it. No drive-by cleanups, renames or reformatting.
A small local refactor is fine if it makes the fix simpler. If the correct fix needs more, like an interface change or a redesign, stop. Say what the root cause is and what the real fix would take, and don't patch around it.
