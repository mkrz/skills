---
name: go-all-in
description: Use this skill if the user explicitly says "go all in"
---

# Go All In

Work on the tasks the user gave you on your own until the PR is merged.

When you work on something and hit a milestone or finish a task, commit it. Each commit holds one concern.
Use the `consolidate` skill to verify bigger tasks.

When all tasks are done, run `bulletproof` locally on everything you made. Then create the PR using the`pr-it-ty` skill and push to it.

Wait for CI and all bot comments to come in, then run `satisfy-ci` until every thread is resolved or dismissed.

Check once again before you merge. Merge the PR only when all of this is true:

- Everything the user wanted is covered.
- All checks are green.
- No human review is requested.
- Nothing is left open the user has to confirm.

If all of them are true, merge the PR. Otherwise stop and tell the user what is left.
