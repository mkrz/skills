import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

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

// The YAML between the first two `---` lines, or null without them.
const frontmatter = (text) => {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);

  return match === null ? null : object(match[1]);
};

const stripFrontmatterAndCode = (text) =>
  text
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replaceAll(/(?:```[\s\S]*?```|~~~[\s\S]*?~~~)/g, '');

const object = (yaml) => {
  try {
    const value = parse(yaml);

    return typeof value === 'object' && value !== null ? value : {};
  } catch {
    return null;
  }
};

const filled = (value) => typeof value === 'string' && value.trim() !== '';

// A backticked name before "skill", or any hyphenated backticked name.
// A missing skill sends an agent into a dead end, so a hyphenated name that
// is not a skill has to be listed in `notSkills`.
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

const backtickedSkills = (text) =>
  [...text.matchAll(/`([a-z][a-z0-9-]*)`/g)]
    .map((match) => match[1])
    .filter((name) => names.includes(name));

// A vendor followed by a version, e.g. "GPT 6.1 Sol" or "claude-fable-5-2".
const modelName = /\b(gpt|claude|gemini|grok)(?:[ -][a-z]+){0,2}[ -]\d/i;

const checkNamedSkills = (label, text) => {
  for (const other of namedSkills(text)) {
    if (!names.includes(other)) {
      errors.push(
        `${label}: names \`${other}\`, which is not a skill. Fix the name, or add it to notSkills in scripts/check-skills.mjs if it isn't meant as one`,
      );
    }
  }
};

const actualUses = new Map();

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
    errors.push(`${name}: SKILL.md has no valid YAML frontmatter`);
    continue;
  }

  if (fields.name !== name) {
    errors.push(
      `${name}: name is "${fields.name}", rename it to the folder name`,
    );
  }

  if (!filled(fields.description)) {
    errors.push(`${name}: add a description that says when the skill fires`);
  }

  checkNamedSkills(name, text);

  actualUses.set(
    name,
    new Set(
      backtickedSkills(stripFrontmatterAndCode(text)).filter(
        (other) => other !== name,
      ),
    ),
  );

  if (modelName.test(text)) {
    errors.push(`${name}: names a model, move it to BASE.md`);
  }

  if (!existsSync(yamlPath)) {
    errors.push(`${name}: agents/openai.yaml is missing`);
    continue;
  }

  const yamlText = read(yamlPath);
  const yaml = object(yamlText);

  if (yaml === null) {
    errors.push(`${name}: agents/openai.yaml is not valid YAML`);
    continue;
  }

  checkNamedSkills(`${name}/agents/openai.yaml`, yamlText);

  if (modelName.test(yamlText)) {
    errors.push(
      `${name}: agents/openai.yaml names a model, move it to BASE.md`,
    );
  }

  if (
    !filled(yaml.interface?.display_name) ||
    !filled(yaml.interface?.short_description)
  ) {
    errors.push(
      `${name}: agents/openai.yaml needs a display_name and a short_description`,
    );
  }

  const typedOnly = fields['disable-model-invocation'] === true;
  const implicitOff = yaml.policy?.allow_implicit_invocation === false;

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

const usesMatch = /Some skills call others\.[^\n]*\n([\s\S]*?)(?:\n## |$)/.exec(
  readme,
);

if (usesMatch === null) {
  errors.push('README.md: missing the skill uses section');
} else {
  const readmeUses = new Map();
  const bulletOwners = new Set();
  const addUse = (owner, dep) => {
    if (!readmeUses.has(owner)) {
      readmeUses.set(owner, new Set());
    }
    readmeUses.get(owner).add(dep);
  };

  for (const rawLine of usesMatch[1].split('\n')) {
    const line = rawLine.trim();
    if (line === '') continue;

    const bullet = /^- `([a-z][a-z0-9-]*)`(?:\s|$)/.exec(line);
    if (bullet !== null) {
      const owner = bullet[1];
      if (!names.includes(owner)) {
        errors.push(
          `README.md: \`${owner}\` is in the skill uses list but not in skills/`,
        );
        continue;
      }
      if (bulletOwners.has(owner)) {
        errors.push(
          `README.md: \`${owner}\` is listed more than once in the skill uses list`,
        );
      }
      bulletOwners.add(owner);

      for (const match of line
        .slice(bullet[0].length)
        .matchAll(/`([a-z][a-z0-9-]*)`/g)) {
        const dep = match[1];
        if (!names.includes(dep)) {
          errors.push(
            `README.md: \`${dep}\` in the skill uses list is not a skill`,
          );
          continue;
        }
        if (dep !== owner) {
          addUse(owner, dep);
        }
      }
      continue;
    }

    const followUp = line.indexOf('`never-again`');
    if (followUp !== -1) {
      for (const owner of backtickedSkills(line.slice(0, followUp))) {
        addUse(owner, 'never-again');
      }
    }
  }

  for (const name of names) {
    if (!actualUses.has(name)) continue;

    const expected = actualUses.get(name);
    const documented = readmeUses.get(name) ?? new Set();

    for (const dep of expected) {
      if (!documented.has(dep)) {
        errors.push(
          `README.md: list \`${dep}\` under \`${name}\` in the skill uses list`,
        );
      }
    }

    for (const dep of documented) {
      if (!expected.has(dep)) {
        errors.push(
          `README.md: \`${name}\` lists \`${dep}\` in the skill uses list, but ${name}/SKILL.md does not name it`,
        );
      }
    }
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
