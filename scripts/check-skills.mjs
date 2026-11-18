import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const skillsDir = join(root, 'skills');
const errors = [];

// Hyphenated names in backticks that are not skills.
const notSkills = ['agent-browser', 'disable-model-invocation'];

const names = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const read = (path) => readFileSync(path, 'utf8').replaceAll('\r\n', '\n');

const unquote = (value) => {
  const trimmed = value.trim();
  const quoted = /^'(.*)'$/.exec(trimmed) ?? /^"(.*)"$/.exec(trimmed);

  return quoted === null ? trimmed : quoted[1].trim();
};

const frontmatter = (text) => {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (match === null) return null;

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => /^([a-z-]+):(.*)$/.exec(line))
      .filter((field) => field !== null)
      .map((field) => [field[1], unquote(field[2])]),
  );
};

// A YAML field on its own line, so a comment that mentions it doesn't count.
const yamlField = (yaml, key) => {
  const match = new RegExp(`^\\s*${key}:(.*)$`, 'm').exec(yaml);

  return match === null ? null : unquote(match[1].replace(/\s#.*$/, ''));
};

// A backticked name before "skill", or any hyphenated backticked name.
const namedSkills = (text) => [
  ...new Set(
    [
      ...text.matchAll(/`([a-z][a-z0-9-]*)` skill\b/g),
      ...text.matchAll(/`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g),
    ]
      .map((match) => match[1])
      .filter((name) => !notSkills.includes(name)),
  ),
];

// A vendor followed by a version, e.g. "GPT 6.1 Sol" or "claude-fable-5-2".
const modelName = /\b(gpt|claude|gemini|grok)(?:[ -][a-z]+){0,2}[ -]\d/i;

const checkNamedSkills = (label, text) => {
  for (const other of namedSkills(text)) {
    if (!names.includes(other)) {
      errors.push(`${label}: names \`${other}\`, which is not a skill`);
    }
  }
};

for (const name of names) {
  const skillPath = join(skillsDir, name, 'SKILL.md');
  const yamlPath = join(skillsDir, name, 'agents', 'openai.yaml');

  if (!existsSync(skillPath)) {
    errors.push(`${name}: SKILL.md is missing`);
    continue;
  }

  const text = read(skillPath);
  const fields = frontmatter(text);

  if (fields === null) {
    errors.push(`${name}: SKILL.md has no frontmatter`);
    continue;
  }

  if (fields.name !== name) {
    errors.push(
      `${name}: name is "${fields.name}", rename it to the folder name`,
    );
  }

  if (!fields.description) {
    errors.push(`${name}: add a description that says when the skill fires`);
  }

  checkNamedSkills(name, text);

  if (modelName.test(text)) {
    errors.push(`${name}: names a model, move it to BASE.md`);
  }

  if (!existsSync(yamlPath)) {
    errors.push(`${name}: agents/openai.yaml is missing`);
    continue;
  }

  const yaml = read(yamlPath);

  if (
    !yamlField(yaml, 'display_name') ||
    !yamlField(yaml, 'short_description')
  ) {
    errors.push(
      `${name}: agents/openai.yaml needs a display_name and a short_description`,
    );
  }

  const typedOnly = fields['disable-model-invocation'] === 'true';
  const implicitOff = yamlField(yaml, 'allow_implicit_invocation') === 'false';

  if (typedOnly !== implicitOff) {
    errors.push(
      `${name}: disable-model-invocation in SKILL.md and allow_implicit_invocation in agents/openai.yaml disagree`,
    );
  }
}

const readme = read(join(root, 'README.md'));
const listed = [...readme.matchAll(/^\| `([a-z][a-z0-9-]*)`\s*\|/gm)].map(
  (match) => match[1],
);

for (const name of names) {
  const rows = listed.filter((row) => row === name).length;

  if (rows !== 1) {
    errors.push(
      `README.md: \`${name}\` needs one row in a skill table, found ${rows}`,
    );
  }
}

for (const name of new Set(listed)) {
  if (!names.includes(name)) {
    errors.push(`README.md: \`${name}\` is in a table but not in skills/`);
  }
}

for (const file of ['README.md', 'BASE.md', 'AGENTS.md']) {
  checkNamedSkills(file, read(join(root, file)));
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`${names.length} skills checked`);
