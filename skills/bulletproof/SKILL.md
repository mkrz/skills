---
name: bulletproof
description: Thorough code review by multiple subagents from different providers, with the findings fixed in the main thread. Use this skill when the user says "bulletproof it".
---

# Bulletproof

Default Models:

- GPT 6.1 Sol at high
- Claude Opus 5.5 at high

Run the `consolidate` skill with one subagent per model. Use the default models, if the user does not name specific models.
You may go up to 5 rounds, if it's a big diff or touches security.
If you can't reach any of the providers, stop and say so; don't swap in a random model.

At the end, report the bar, each round's scores, what changed, what you rejected and the follow-up list.
