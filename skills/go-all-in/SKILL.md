---
name: go-all-in
description: Work on tasks until they are merged. Use this skill if the user explicitly says "go all in".
---

# Go All In

Work on the tasks the user gave you on your own until the PR is merged.

When you work on something and hit a milestone or finish a task, commit it. Each commit holds one concern.
While working on tasks, especially on requests with an extensive scope, regularly use the `consolidate` skill to review milestones or `bulletproof` to verify and harden important interfaces and areas where security matters.
If the user gave you one granular task, you should use either `consolidate` or `bulletproof`, depending on the area and scope.

Ask the user before you change how the work is split into PRs, or the bar a review holds it to.

When you hand work to other agents, make sure their completion wakes you, or check on them yourself. Never wait on an agent that can't wake you.
Keep the number of agents running tests at once to what the machine can carry. After an agent dies, pick up from the state it left on disk.
For a large migration, prefer slices that start from one base in parallel and are merged afterwards over a deep stack of PRs that each wait for the one below.

After all tasks and reviews are done, create a new PR using the `pr-it-ty` skill and push to it.

Wait for CI and all bot comments to come in, then run `satisfy-ci` until every thread is resolved or dismissed.

Check once again before you merge. Merge the PR only when all of this is true:

- Everything the user wanted is covered.
- All checks are green.
- No human review is requested.
- Nothing is left open the user has to confirm.

Otherwise stop and tell the user what is left.
