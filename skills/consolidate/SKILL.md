---
name: consolidate
description: Code review by a subagent in rounds, with the findings fixed in the main thread. Use when the user wants the current changes reviewed.
---

# Consolidate

Review the current changes with a subagent. Use GPT 6.1 Sol at high, if the user does not name a specific model. If unavailable, use the latest flagship model of another provider with high or xhigh effort.
If the branch has no diff against its base, ask the user what to review.

## The Brief

Give the subagent the repo path, base commit, diff command, intent and what's out of scope.
Add the bar the change has to hold up against, based on the intent.
Keep the same bar for every round. A bar that moves always has one more hole.

Tell it the goal and the bar, not how to review.
It may read any file, run the tests and the code and write throwaway scripts outside the repo. Tell it not to edit anything.

Ask it to mark each finding as introduced by the diff or pre-existing.
Each finding should include a reproduction example to provide evidence, unless the code itself serves as that evidence.
Tell it to reply with all findings listed including a score out of 10, the areas of the app it scanned and the files it read.
Ask it to end with "APPROVE" when the change meets the bar, otherwise "CHANGES". Approving never means leaving findings out.

For a large diff, tell it to split the diff into areas and check each one by running the old and new code on the same inputs, not just by reading.

Give it a file of settled decisions: questions you or the user already decided, such as rules the repo's linter enforces on purpose. Add every finding you reject for a lasting reason to that file. Reviewers must not raise a settled decision again.

Tell it the safety rules of the machine: no real services or `.env` files, fakes for every external command, and scratch files in its own new directory, never a shared one.

## Each Round

Wait for all reviewers in a round to report back to you before acting on responses.

Review and check every finding yourself. You decide which findings are valid and worth a fix or rejected.
Reject unneeded nits, unneeded tests and anything out of scope in one line with the reason. Keep the PR at the size the user's goal needs, because review loops tend to go out of scope.

Fix valid findings the diff introduced in the main thread using the `easy-fix` skill.
If the same code gets findings in two rounds in a row, stop patching it and rethink its design once.

Pre-existing findings go on a follow-up list for the user, with security holes at the top.

After all fixes are committed, start the next round with the same brief and the diff since the last round.
List every finding so far, one line each with its status as a plain fact (e.g. "fixed in a1b2c3d", "rejected: needs an admin key").
Ask the reviewers to check that each fix closes its finding without a new regression.
Point them specifically at files no one has read and areas that no one has looked at yet. Everywhere else only new findings that break the bar count.
Do not tell subagents which round it is. Always give them the findings so far and the settled decisions.

## Stop Condition

Only findings that break the bar count toward a new round. When a round's only findings are docs or wording, fix them and have one reviewer check just those commits.

Stop when either all subagents approve, or after a maximum of 3 rounds if the user does not explicitly want more rounds.
If the last round produced fixes, review just those commits once more, even at the limit. Unreviewed fixes don't count as approval.

If you hit the round limit, or a disagreement is still open after two rounds, show both sides and let the user decide. Hitting the limit doesn't count as approval.

At the end, report the bar, each round's scores, what changed, what you rejected and the follow-up list, if no other skill called consolidate.
