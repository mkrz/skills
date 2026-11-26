---
name: consolidate
description: Code review by an independent subagent in a loop. Use when the user says "consolidate it" or wants the current changes reviewed.
---

# Consolidate

Review the current changes with an independent subagent using the review model.
Stop and ask if no review model is available, or if the branch has no diff against its base and no area to review is specified.

## Brief

Give the reviewer:

- repo path, base commit, diff command, intent and out-of-scope items
- the bar the change must meet
- settled decisions (decided questions, lasting rejections and deferred findings) that it must not raise again
- rules: never edit files and never use production services

Ask the reviewer for:

- findings with evidence (run output or exact lines), tagged as introduced or pre-existing
- any part a smaller change can replace
- `APPROVE` or `CHANGES` as the last line. Approve only with zero blockers. A blocker is an introduced finding that breaks the bar, or a pre-existing finding that blocks the intent.

## Round

Check every finding yourself. Reject nits, unneeded tests and out-of-scope findings with a short reason.

Load and follow the `easy-fix` skill before editing. Fix valid blockers and commit the fixes. Put other pre-existing findings on a follow-up list, and add them and lasting rejections to settled decisions.

For the next round, send the same brief plus the fix diff and a one-line status for each prior finding. Tell the reviewer to check only the fixes, any regressions in touched code, and known causes across the diff.

## Stop

Only blockers start a new round. Stop on `APPROVE` or after 3 rounds (5 for sensitive areas).
If the last round produced fixes at the limit, run one final check on the fix diff. At the limit, stop and show the user.

At the end, report what changed, rejections, the follow-up list, any open blockers and every cause raised twice for the `never-again` skill.
