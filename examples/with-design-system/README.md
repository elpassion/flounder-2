# flounder with [DesignSystemNameHere](http://npmjs.com/design-system-url)

Example usage of flounder project with Internal Design System.
<br />
For full Documentation go see [Storybook](https://elpassion.github.io/flounder-2)
<br />

**Requirments:**

- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  <br />

## How to use flounder with design system

This will guide you from scratch how to add Design System to existing flounder repository.<br/>
First of all add and install design system using pnpm

```bash
pnpm add @elpassion/taco # or any other name we choose
pnpm install
```

Next in your `.config/tailwind.config.js` enable `jit and dark mode`, add plugin `@tailwindcss/forms` and import `initDefaultTheme()` or `getThemeFromFigmaTokens()` depends on how you're gonna use Design system.
<br /><br />
Then extend your config, Design system by default use tailwind `{theme: { extend: ... }}` object not overriding default tailwind values.

```js
const { initDefaultTheme, getThemeFromFigmaTokens } = require('elp-taco-ui');
const { merge } = require('lodash');

const existingProjectConfig = {
  extend: { ...existingThemeVariables },
};

module.exports = {
  // Enabling dark mode
  darkMode: 'class',
  // Enabling JIT
  mode: 'jit',
  // Merge existing config with defaults, alternatively you can generate your own using getThemeFromFigmaTokens()
  // example: theme: getThemeFromFigmaTokens(...JSON_File),
  theme: merge(initDefaultTheme(), existingProjectConfig),
  // Add and enable forms reset
  plugins: [require('@tailwindcss/forms')],
};
```

The last step is adding to your `apps/frontend/tailwind.config.js` prune directory for node_module/taco-ui
<br />

```js
const { join } = require('path');
const { merge } = require('lodash');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const baseConfig = require('../../.config/tailwind.config');

module.exports = merge(baseConfig, {
  content: [
    join(__dirname, './modules/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../node_modules/elp-taco-ui/**/*.{js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
});
```
