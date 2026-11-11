---
name: go-all-in
description: Work on tasks until their PR is ready to merge. Use this skill if the user explicitly says "go all in".
---

# Go All In

Work on the tasks the user gave you on your own until the PR is ready to merge.

When you work on something and hit a milestone or finish a task, commit it. Each commit holds one concern.
While working on tasks, especially on requests with an extensive scope, regularly use the `consolidate` skill to review milestones or `bulletproof` to verify and harden important interfaces and areas where security matters.
If the user gave you one granular task, you should use either `consolidate` or `bulletproof`, depending on the area and scope.

After all tasks and reviews are done, create a new PR using the `pr-it-ty` skill and push to it.

Wait for CI and all bot comments to come in, then run `satisfy-ci` until every thread is resolved or dismissed.

Never merge the PR. You are done when all of this is true:

- Everything the user wanted is covered.
- All checks are green.
- Nothing is left open the user has to confirm.

Otherwise stop and tell the user what is left.
