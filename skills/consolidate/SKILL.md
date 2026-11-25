---
name: consolidate
description: Code review by a subagent in rounds, with the findings fixed in the main thread. Use when the user says "consolidate it" or wants the current changes reviewed.
---

# Consolidate

Review the current changes with a subagent using the review model from `BASE.md`, unless the user names one.
Stop and ask if none is available or the branch has no diff against its base.

## The Brief

Give the reviewer the goal and the bar, not how to review:

- repo path, base commit, diff command, intent and what is out of scope
- the bar the change must meet, the same in every round
- settled decisions: questions already decided, lasting rejections and deferred pre-existing findings. It must not raise them again.
- safety rules: no real services or `.env` files, fakes for external commands, scratch files in a new directory outside the repo

It may read any file and run code and tests, but never edit anything.

Ask it for:

- the areas of the change, one per behavior path (you name risky ones as a floor, it adds the rest). It runs the code in each area (comparing old and new on the same inputs where possible) and marks each `ran`, `read` (with the reason) or `not checked`. An area that cannot run under the safety rules is `read`.
- every finding with evidence (run output or exact lines), tagged with its cause, introduced or pre-existing, and `ran` or `read`. Leave out unproven claims. No findings is valid.
- any part a smaller change would replace, with that change
- the files it read
- `APPROVE` or `CHANGES` as the last line. A blocker is an introduced finding that breaks the bar, a pre-existing finding that blocks the intent, or an in-scope `not checked` area. Approve only with zero blockers. Approving never means leaving findings out.

## Each Round

Check every finding yourself. Verify each `read` finding: run it if it is about behavior, otherwise confirm it in the source. Reject nits, unneeded tests and out-of-scope findings in one line with the reason.

Load and follow the `easy-fix` skill before editing. Fix valid introduced findings and pre-existing findings that block the intent. Rethink the design once if the same code fails two consecutive rounds.
Put other pre-existing findings on a follow-up list (security first), and add them and lasting rejections to settled decisions in the same round.

After committing fixes, start the next round with the same brief plus:

- the diff of all fix commits
- every finding so far, one line each (e.g. "rejected: needs admin key", "deferred: pre-existing", "fixed in a1b2c3d: missing await, also in 2 handlers, repro passes"). Each fix line names the commit, cause, other places and check.
- the areas with their states

Tell it this follow-up scope overrides the initial area sweep: check only that each fix closes its finding, that the fix commits add no regression, each known cause across the diff and any `not checked` area. Tell it not to hunt checked areas, while still reporting any blocker seen in touched code.
Do not tell it which round it is. After each round, report one status line: verdict, accepted blocking findings (introduced and pre-existing) and areas per state.

## Stop Condition

Only blockers start a new round. For docs or wording findings alone, fix them and have the reviewer check just those commits.
Stop on `APPROVE`, or after 3 rounds (5 for security work), unless the user asks for more.
If the last round produced fixes, run one final check on all fix commits, even at the limit. If it finds a blocker, stop and show the user. Do not fix it.
At the limit, or after two rounds of open disagreement, stop and show both sides. The limit is not approval.

At the end, report the bar, each round's status line, which skills ran, what changed, open regressions, rejections, the follow-up list and every cause raised in two rounds for the `never-again` skill.
