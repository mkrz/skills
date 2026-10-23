#!/usr/bin/env node
// Checks the repo invariants listed in AGENTS.md. Exits 1 on any failure.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const fail = (msg) => errors.push(msg);

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const fields = {};
  const lines = match[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2];
    if (value === ">-" || value === ">" || value === "|") {
      const block = [];
      while (lines[i + 1]?.startsWith("  ")) block.push(lines[++i].trim());
      value = block.join(" ");
    }
    fields[kv[1]] = value.replace(/^["']|["']$/g, "");
  }
  return fields;
}

const skillsDir = join(root, "skills");
const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const readme = readFileSync(join(root, "README.md"), "utf8");

for (const name of skills) {
  const dir = join(skillsDir, name);
  const skillFile = join(dir, "SKILL.md");
  if (!existsSync(skillFile)) {
    fail(`skills/${name}: missing SKILL.md`);
    continue;
  }
  const fm = frontmatter(readFileSync(skillFile, "utf8"));
  if (!fm) {
    fail(`skills/${name}/SKILL.md: missing frontmatter`);
    continue;
  }
  if (fm.name !== name) fail(`skills/${name}/SKILL.md: name "${fm.name}" does not match folder`);
  if (!fm.description) fail(`skills/${name}/SKILL.md: missing description`);

  const yamlFile = join(dir, "agents", "openai.yaml");
  if (!existsSync(yamlFile)) {
    fail(`skills/${name}: missing agents/openai.yaml`);
  } else {
    const userInvoked = fm["disable-model-invocation"] === "true";
    const noImplicit = /allow_implicit_invocation:\s*false/.test(readFileSync(yamlFile, "utf8"));
    if (userInvoked !== noImplicit) {
      fail(`skills/${name}: disable-model-invocation and allow_implicit_invocation disagree`);
    }
  }

  if (!readme.includes(`(skills/${name}/SKILL.md)`)) fail(`README.md: no link to skills/${name}/SKILL.md`);
}

for (const [, linked] of readme.matchAll(/\(skills\/([^/]+)\/SKILL\.md\)/g)) {
  if (!skills.includes(linked)) fail(`README.md: links missing skill "${linked}"`);
}

const tracked = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter((file) => /\.(md|ya?ml|json|sh|mjs)$/.test(file));
for (const file of tracked) {
  readFileSync(join(root, file), "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes(String.fromCharCode(0x2014))) fail(`${file}:${i + 1}: em dash`);
    });
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`ok: ${skills.length} skills`);
