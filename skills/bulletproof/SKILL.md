---
name: bulletproof
description: All-in review split by area, with reviewers from different providers per area and the findings fixed by area. Use it for security, big features or large chunks of work up to a complete app, or when the user says "bulletproof it".
---

# Bulletproof

Use the review models in `BASE.md`, if the user does not name specific models.
If you can't reach any of the providers, stop and say so; don't swap in a random model.
If the branch has no diff against its base, ask the user what to review.

## Areas

Before anyone reviews, split the change into areas.
An area is one feature or package, small enough for one reviewer to read whole.
A single feature is one area.

Write the area map next to the settled decisions.
For each area, list its files, intent and bar.
Also list the seams it shares with other areas (e.g. contracts, schemas and shared helpers).

Base each area's bar on its intent.
Keep the same bar for every round. A bar that moves always has one more hole.

## Settled Decisions

Keep a file of settled decisions: questions you or the user already decided.
Add every finding you reject for a lasting reason to that file.
Reviewers must not raise a settled decision again.

## The Brief

Give each reviewer the repo path, base commit, diff command, its area, the seams it checks from its side, what's out of scope, the bar and the settled decisions.
Tell it the goal and the bar, not how to review.

It may read any file, run the tests and the code and write throwaway scripts outside the repo.
Tell it not to edit anything.
Tell it the safety rules of the machine: no real services or `.env` files, fakes for every external command and scratch files in its own new directory, never a shared one.

Tell it to check its area by running the old and new code on the same inputs, not just by reading.
Ask it to mark each finding as introduced by the diff or pre-existing.
Each finding needs evidence: a reproduction it ran, or the exact lines that show it.
Tell it to leave out what it can't show. No findings is a valid result.
It lists findings outside its area in one line each, and you route them to their area.

Tell it to reply with all findings listed, a score out of 10 and the files it read.
Ask it to end with "APPROVE" when its area meets the bar, otherwise "CHANGES". Approving never means leaving findings out.

## Reviewers

Each area gets two reviewers from different providers.
Rotate the pairs across areas, if you have three or more models.

Start all areas at once.
Restart a failed reviewer once, for its area alone.
If it fails again, report it instead of retrying.

## Triage

Wait for both reviewers of an area before you act on its findings.
Check every finding yourself. You accept or reject it. Workers never decide.

Reject unneeded nits, unneeded tests and anything out of scope in one line with the reason.
Keep the PR at the size the user's goal needs, because review loops tend to go out of scope.
Pre-existing findings go on a follow-up list for the user, with security holes at the top.

Ask the user in one batch about product decisions that aren't written down.
Keep the other areas going meanwhile.

## Fixes

Fix the valid findings the diff introduced.
Fix them in the main thread, if there are only a few.
Spawn one fix worker per area in its own worktree, if there are many.
Give it the accepted findings and the settled decisions.
Tell it to make one commit per finding, keep CI green and never push.

Every fix follows the `easy-fix` skill, in the main thread and in every worker.
When a fix needs an interface change or a redesign, the worker commits nothing for that finding.
It reports the root cause and what the real fix would take, and you decide.
Easy fixes on the same code tend to cause its next finding.
Rethink that code's design once yourself, if it gets findings in two rounds in a row.

Read each worker's commits before you merge them.
Run the full CI after every merge.
A fix that changes another area's files or a seam reopens that area for a check of just those commits.

## Rounds per Area

Each area runs its own loop, so reviewers spend their time where the findings are.
An area's next round gets the same brief and the commits since its last round.
List every finding of the area so far, one line each with its status as a plain fact (e.g. "fixed in a1b2c3d", "rejected: needs an admin key").
Ask the reviewers to check that each fix closes its finding without a new regression.
Point them at files in the area nobody has read yet. Everywhere else only new findings that break the bar count.
Don't tell reviewers which round it is.

Only findings that break the bar count toward a new round.
When a round's only findings are docs or wording, fix them and have one reviewer check just those commits.

An area is done when both reviewers approve, or after 3 rounds.
An area may go up to 5 rounds, if it's big or touches security.
A done area drops out.
Never run a round over the whole app. It re-reviews approved areas and finds little new.

If an area's last round produced fixes, one reviewer checks just those commits, even at the limit. Unreviewed fixes don't count as approval.
If an area hits its limit, or a disagreement is still open after two rounds, show both sides to the user. Hitting the limit doesn't count as approval.

## The End

When every area is done:

1. One reviewer checks only the seams that fixes changed across areas.
2. Run the full CI and the repo's end-to-end checks.
3. Remove the worktrees, scratch files and processes you started.

At the end of each round briefly report each area's reviewers, score and verdict in a table.
At the end, report the bar, each area's scores, what changed, what you rejected and the follow-up list.
