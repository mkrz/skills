---
name: consolidate
description: Code review by a subagent, with the findings fixed in the main thread. Use when the user wants the current changes reviewed.
---

# Consolidate

Review the current changes with a subagent. Use GPT 6.1 Sol at xhigh, if the user does not name specific models. If it is unavailable, use the latest flagship model of another provider with high or xhigh effort.
Give the subagent the repo path, base commit, diff command, intent and what's out of scope. Tell it not to edit anything, and to reply with "NONE" or with all findings listed including a score out of 10. Each finding should include a reproduction example to provide evidence, unless the code itself serves as that evidence.

Review and check every finding yourself. Fix real blockers in the main thread using the `easy-fix` skill. Keep the PR at the size the user's goal needs.

Reject nits, unneeded tests and anything out of scope in one line with the reason.

At the end, report the score, what changed and what you rejected, if no other skill called consolidate.
