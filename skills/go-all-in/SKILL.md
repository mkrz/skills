---
name: go-all-in
description: Use when the user explicitly says "go all in".
---

# Go All In

Work through the user's tasks on your own until the PR is ready to merge. Never merge or deploy unless the user asked for it.
Always open a PR, even for a new app. If the repo has no remote, stop and ask where to push first.

Commit each finished task or milestone with one concern per commit.
Use the `consolidate` skill on milestones, or once before the PR for a small task. Check that every user request is covered in the branch diff.

Before opening the PR, run the `prove-it` skill on every change to behavior or UI.
If it returns `NOT PROVEN`, fix the failures with the `easy-fix` skill and run `prove-it` again (up to 2 fix rounds). If it still fails, stop and show the user what is left.

Create and push the PR using the `pr-it-ty` skill, then run the `satisfy-ci` skill.
If `satisfy-ci` changes app behavior or UI (not just lint, types, tests or docs), run `prove-it` again on the touched flows. If that needs fixes, push them and run `satisfy-ci` once more; if that changes behavior or UI again, stop and tell the user what is left.

Stop and tell the user what is left if any skill hits its limit or needs confirmation.

End with the PR status lines from `pr-it-ty`, which skills ran and every cause raised twice for the `never-again` skill.
