# Skills

How to change the skills in this repo.

## Before You Write

A lesson needs two cases before it becomes a rule. A rule written from one bad session only fits that session.
If lint, a type or a script can enforce it, put it there and not into a skill.
Change a skill in its own PR, never in the middle of another task.
Say in the commit what happened that made the rule necessary (e.g. "since GitHub rejected a longer push").

## Writing

Tell the agent what to do. Give the reason only where it has to judge.
Cut every sentence the model follows anyway.
A description says when the skill fires, not how it works. Change it in the same commit as the body.
Name another skill instead of repeating its rules.
Never set a limit without saying what wins when it's hit.
Write the way the other skills read: short plain sentences, the conclusion first and no em dashes.

## Base Rules

`BASE.md` is loaded in every session, so every line in it costs every task.
Only add a rule that applies to nearly every task.
Models are named in `BASE.md` and nowhere else.

## Checks

Run `pnpm run verify` before you commit.
It checks the format, the house rules and `scripts/check-skills.mjs`, which fails when:

- a skill's `name` is not its folder name
- a skill has no description or no `agents/openai.yaml`
- `disable-model-invocation` in the skill and `allow_implicit_invocation` in `agents/openai.yaml` disagree
- a skill, its `agents/openai.yaml`, `README.md`, `BASE.md` or this file names a skill that doesn't exist. Every hyphenated name in backticks counts as a skill, unless it's listed in `notSkills` in the script
- the tables in `README.md` don't list every skill in `skills/` exactly once
- the skill uses list in `README.md` doesn't match the skills named in each `SKILL.md`
- a skill or its `agents/openai.yaml` names a model
