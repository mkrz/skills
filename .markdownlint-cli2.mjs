import noEmDash from './scripts/no-em-dash.mjs';

// Only the house rules run. Formatting belongs to oxfmt.
export default {
  config: { default: false, 'no-em-dash': true },
  customRules: [noEmDash],
  globs: ['**/*.md'],
  ignores: ['**/node_modules/**'],
};
