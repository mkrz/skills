# Working in this repo

Run `node scripts/check.mjs` after any change.

## A skill folder

- `SKILL.md` with frontmatter `name` equal to the folder name, and a `description`.
- `agents/openai.yaml` with `interface.display_name` and `interface.short_description` for the Codex picker.
- Supporting files (briefs, templates, references, scripts) sit beside `SKILL.md` and are linked from it by relative path.

## Invocation

Every skill is either user-invoked or model-invoked, and both harnesses must agree:

- **User-invoked** (only the human can fire it): `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. The description is a one-line summary for a person scanning slash commands, with no trigger phrases.
- **Model-invoked** (the agent can fire it on its own): neither flag. The description names what the skill does, then the distinct cases that should trigger it ("Use when..."). It loads into every session, so cut every word that does not change when it fires.

Make a skill model-invoked only when the agent must reach it unprompted or another skill must call it.

## README

`README.md` lists every skill under **User-invoked** or **Model-invoked**, with the name linked to `skills/<name>/SKILL.md` and a one-line description. Add, rename, or remove the entry in the same change as the skill.

# Prose

No em dashes anywhere, the check fails on them. Rewrite the sentence with a period, comma, or colon instead of swapping the character.
