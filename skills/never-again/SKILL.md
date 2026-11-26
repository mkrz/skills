---
name: never-again
description: Use when the user says "never again", or when the same mistake happened a second time and you can name both times.
---

# Never Again

Turn a repeated mistake into a check, not another prose rule.

Name both times the mistake happened (e.g. a commit, review finding, settled decision or user correction). If you cannot name two, stop and say so. The user saying "never again" counts as the second time.

Propose the fix and wait for user confirmation before changing anything. Pick the first option in this order that works:

1. Change the design so the mistake cannot be written (e.g. one way to do the task or one owner per state).
2. Make the types reject it.
3. Add a lint rule whose message names the fix.
4. Add a test that fails when the behavior breaks.
5. Write a prose rule, only for a judgment call no check can make.

Delete the old pattern and any rule in `AGENTS.md` or a skill that the new check replaces.
For project-agnostic lint rules, add the rule to the project first, then open a PR to `@mkrz/oxlint-config`.
For lasting agent lessons that change what an agent does, open a separate PR to `mkrz/skills`, never inside the current task.

Prove each new check by showing it fails on the past mistake and passes on the fix.
