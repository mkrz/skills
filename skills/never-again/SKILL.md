---
name: never-again
description: Turns a repeated mistake into a check that makes it impossible. Use when the user says "never again", or when the same mistake came up a second time and you can name both times.
---

# Never Again

A mistake that happened twice gets a check, not another sentence in a prompt.
Nothing fails when an agent skips a sentence.

## Two Times

Name both times the mistake happened (e.g. a commit, a review finding, a settled decision or a correction by the user).
If you can't name two, stop and say so. One time is not a pattern.
The user saying "never again" counts as the second time.

## The Fix

Try these in order and take the first one that works:

1. Change the design so the mistake can't be written (e.g. one way to do the task, one owner per state or an import that fails).
2. Make the types reject it.
3. Add a lint rule whose message names the fix.
4. Add a test that fails when the behavior breaks.
5. Write a rule in prose. Only do this for a judgment call no check can make.

Delete the old way as well, because the next agent copies what it finds.
When a check replaces a rule in `AGENTS.md` or in a skill, delete that rule.

## Lint Rules

Add the rule to the project first.
Then open a PR with the same rule to `@mkrz/oxlint-config`, unless the rule is about this project's domain.

## Skills

A lesson about how agents work goes into the skill that should have caught it.
Open it as its own PR to `mkrz/skills`, never as part of the current task.
Only keep a lesson that still holds in six months and changes what an agent does.

## Proof

Show that each new check fails on the real past mistake and passes on the fix.
A check you never saw fail proves nothing.

## Approval

List each mistake with its two times and the fix you propose, then wait for the user to confirm before you change anything.
