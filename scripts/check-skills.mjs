import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const skillsDir = join(root, 'skills');
const errors = [];

const names = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const frontmatter = (text) => {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (match === null) return null;

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => /^([a-z-]+):\s*(.*)$/.exec(line))
      .filter((field) => field !== null)
      .map((field) => [field[1], field[2].trim()]),
  );
};

// A backticked name directly before "skill", e.g. "the `easy-fix` skill".
const namedSkills = (text) =>
  [...text.matchAll(/`([a-z][a-z0-9-]*)` skill\b/g)].map((match) => match[1]);

const modelName = /\b(GPT|Claude|Gemini|Grok)\s+[A-Z0-9]/;

for (const name of names) {
  const skillPath = join(skillsDir, name, 'SKILL.md');
  const yamlPath = join(skillsDir, name, 'agents', 'openai.yaml');

  if (!existsSync(skillPath)) {
    errors.push(`${name}: SKILL.md is missing`);
    continue;
  }

  const text = readFileSync(skillPath, 'utf8');
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

  for (const other of namedSkills(text)) {
    if (!names.includes(other)) {
      errors.push(`${name}: names the \`${other}\` skill, which doesn't exist`);
    }
  }

  if (modelName.test(text)) {
    errors.push(`${name}: names a model, move it to BASE.md`);
  }

  if (!existsSync(yamlPath)) {
    errors.push(`${name}: agents/openai.yaml is missing`);
    continue;
  }

  const yaml = readFileSync(yamlPath, 'utf8');

  if (
    !/display_name:\s*\S/.test(yaml) ||
    !/short_description:\s*\S/.test(yaml)
  ) {
    errors.push(
      `${name}: agents/openai.yaml needs a display_name and a short_description`,
    );
  }

  const typedOnly = fields['disable-model-invocation'] === 'true';
  const implicitOff = /allow_implicit_invocation:\s*false/.test(yaml);

  if (typedOnly !== implicitOff) {
    errors.push(
      `${name}: disable-model-invocation in SKILL.md and allow_implicit_invocation in agents/openai.yaml disagree`,
    );
  }
}

const readme = readFileSync(join(root, 'README.md'), 'utf8');
const listed = [...readme.matchAll(/^\| `([a-z][a-z0-9-]*)`\s*\|/gm)]
  .map((match) => match[1])
  .sort();

for (const name of names) {
  if (!listed.includes(name)) {
    errors.push(`README.md: add \`${name}\` to a skill table`);
  }
}

for (const name of listed) {
  if (!names.includes(name)) {
    errors.push(`README.md: \`${name}\` is in a table but not in skills/`);
  }
}

for (const file of ['README.md', 'BASE.md', 'AGENTS.md']) {
  for (const other of namedSkills(readFileSync(join(root, file), 'utf8'))) {
    if (!names.includes(other)) {
      errors.push(`${file}: names the \`${other}\` skill, which doesn't exist`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`${names.length} skills checked`);
