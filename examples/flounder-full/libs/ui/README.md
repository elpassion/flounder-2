# Name of module

[comment]: <> (Required section: Description & Functionalities)

## Description

A package with [tailwind-based](https://tailwindcss.com/) and [headlessUI](https://headlessui.com) components that are connected with [Storybook](https://storybook.js.org/) and ready to use e.g.: Button, Avatar.

Available via `@flounder/ui`

## Functionalities

### Visual Regression Tests

## Fundamentals

- We use regression tests only for "grouped" components to keep low costs on CI
- We use VRT Prefix for stories that should be tackled by [Loki](https://loki.js.org/)
- We keep reference images of components in .loki/reference
- Right now (14 Feb 2023), we're testing for Visual Regression in Chrome on desktop and mobile resolution.
- Final plan is to include also other browsers in tests (todo)

## How to?

- You can check Visual Regression test results in PR (You'll get downloadable results in artifacts)
- You can run test also locally using `pnpm nx run ui:loki-test`
- If you need to update reference images use `pnpm nx run ui:loki-update`
- Run `pnpm nx run ui:loki-approve` to manually approve current images

### Components

- pre-styled simple components: `Alert`, `Avatar`, `Button` etc.
- `form` related components: `inputs`, `label` & example forms
- components for Toasts [react-hot-toast](https://react-hot-toast.com) and [WYSIWYG](https://www.npmjs.com/package/react-quill) editor.

## Files structure

Each component itself or related components should be created in its directory and have at least two or three files:

- `index.ts` - reexport all components from the directory
- `types.ts` - types/interfaces related to component
- `ComponentNameFile.tsx` - file with the main component
- `ComponentNameFile.stories.tsx` - file with Storybook stories that show how component look and work (you can create many stories to show different states, component props, etc.)

## Manually triggered build count

🐟 🐟
