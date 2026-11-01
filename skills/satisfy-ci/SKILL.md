---
name: satisfy-ci
description: Verify and react to every bot's comment in a pull request. Use when the user wants to satisfy the CI of a pull request.
---

# Satisfy CI

Verify every bot finding in the current PR against the source code before making changes.

Distinguish repository issues from infrastructure ones in CI failures.
Fix real blockers found by code reviewing bots and CI failures using the `easy-fix` skill. Keep the PR at the size the user's goal needs.

Reject nits, unneeded tests, anything out of scope and wrong findings with a comment.
Screenshots and videos help as well, when you have a way to upload them.

Resolve or dismiss all threads. Write comments using the `writing-comments` skill.
