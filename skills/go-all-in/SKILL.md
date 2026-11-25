---
name: go-all-in
description: Work on tasks until their PR is ready to merge. Use this skill if the user explicitly says "go all in".
---

# Go All In

Work on the tasks the user gave you on your own until the PR is ready to merge.
Always open a PR, even when bootstrapping a new app. If the repo has no remote yet, stop and ask the user where to push before creating one.

When you work on something and hit a milestone or finish a task, commit it. Each commit holds one concern.
Regularly use the `consolidate` skill to review milestones, or once at the end for a single granular task.

Before the PR, run two checks in order:

- Spawn an independent agent with the user's original requests and the branch diff to list anything missing. Close any real gaps and review the new code with `consolidate`.
- Run the `prove-it` skill on every change to behavior or UI. If the repo has no way to prove it yet, build one with `prove-it` as part of the work. Stop only if the app can't be driven at all, and say why.

After all tasks, reviews and checks are done, create a new PR using the `pr-it-ty` skill and push to it.

Run the `satisfy-ci` skill. If it stops at its round limit, stop and tell the user what is left.
If `satisfy-ci` changed app behavior or UI (not just lint, types, tests or docs), run `prove-it` again on the touched features. If `prove-it` requires fixes, push them and run `satisfy-ci` once more; if that run changes behavior or UI again, stop and tell the user what is left.

Never merge or deploy unless the user asked for it. You are done when all of this is true:

- Everything the user wanted is covered.
- Every change to behavior or UI is proven after the latest behavior or UI edit.
- All checks are green and `satisfy-ci` reports the PR ready.
- Nothing is left open the user has to confirm.

Otherwise stop and tell the user what is left.

## Report

End with where the work is and what ran:

- The PR status lines from `pr-it-ty`.
- Which skills ran.
- Every cause that came up twice, so the user can run the `never-again` skill on it.
