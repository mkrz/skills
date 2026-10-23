---
name: implement-wisely
description: Comment, commit, and PR rules for code changes. Use when writing code, committing, or opening a PR.
argument-hint: "[tasks]"
---

# Implement Wisely

Apply every rule to each change you make.

## Comments

Write code without comments. The one exception is a constraint the code cannot express, such as a workaround or a spec quirk: explain it in one line. Keep existing comments, and hold them to the same rule when you edit them.

## Commits

When you work on something and hit a milestone or finish a task, commit it. Each commit holds that one concern.

Write each commit message and PR title as a single Conventional Commits line: `type(scope): summary`. Keep it lowercase and imperative, with no trailing period and no body, as in `fix(auth): reject expired refresh tokens`.

## Invoked by Name

When the user typed this skill's name, implement the tasks they referenced, or with no argument the ones from earlier in the thread. Done means every task has its own commit and, off the main branch, the branch is pushed with a PR open.
