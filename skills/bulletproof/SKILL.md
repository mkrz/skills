---
name: bulletproof
description: Review loop for changes using three flagship models from different providers over multiple rounds, verifying findings and fixing blockers and security concerns.
disable-model-invocation: true
---

Run the `consolidate` skill in a loop with three subagents. Use the latest flagship models from three different providers with high or extra high effort, if the user does not name specific models.
If you can't reach three providers, stop and say so; don't swap in a random model.

Wait for all reviewers in a round to report back to you before acting on responses.

After all fixes are committed, start the next round with the same brief and the new diff. List every rejected finding and owner decision so far, one line each with its reason as a plain fact and leave your fixes out of the brief because git history has them.
Review loops tend to grow a PR one cheap-looking fix at a time.

Stop when either all three subagents approve and no blocker is open, or after a maximum of 3 rounds if the user does not explicitly want more rounds. Do not tell subagents about rounds.
If you hit the round limit, or a disagreement is still open after two replies, show both sides and let the user decide. Hitting the limit doesn't count as approval.

At the end, report each round's scores, what changed and what you rejected.
