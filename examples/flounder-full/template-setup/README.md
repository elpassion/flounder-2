# 🐟 flounder

A tool for helping with project setup

## Usage

This project has a corresponding NPM package generated to work with it.

### Login

To download it you first need to login to Github NPM registry: [link to tutorial](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

### Add github registry to ~/.npmrc

```shell
echo '@elpassion:registry=https://npm.pkg.github.com' >> ~/.npmrc
```

### Instalation

After that you can easily download the package by running

```shell
npm i -g @elpassion/flounder
```

### CLI Usage

1. Display help for flounder commands 

```shell
flounder help
```

2. Display help for flounder generating new project command

```shell
flounder new --help
```

### Generating project

```shell
flounder new ~/path-to-project --client=EXAMPLE_CLIENT --project=EXAMPLE_PROJECT
```

### Checking for unused dependencies
If you generated the project without some apps, there might be unused dependencies present in `package.json` file.
Use these CLI commands to address this issue:
> Make sure to run `pnpm install` first
#### Check for unused deps
```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --no-interactive
```

#### Log to JSON

```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --json --no-interactive
```

#### Fix the `package.json`

> ⛔️ **Heads up!**
>
> Use this command only when you are sure the unused deps are really unused.
> There could be something the dependency graph didn't catch for whatever reason.
```sh
nx generate @trumbitta/nx-plugin-unused-deps:check --fix --no-interactive
```

### Usage of generated project

1. Go to generated project directory,
2. In `code` directory run `pnpm install`
3. Then make sure that your database works as required,
4. If your database is setup correctly than to start project locally run `pnpm run serve`,

Note: `If you want login to work you need to configure cognito in env files.`

### Database default settings

#### Postgres:
  - Port: `5432`,
  - Host: `localhost`,
  - User: `postgres:1234`,
  - Database name: `Your_Project_Name`,
  - Test database name: `Your_Project_Name_test`

#### Redis:
  - Port: `6379`,
  - Host: `localhost`,

`Note: If you want to change default settings you need to create your own local env file.`


### Generating project locally

1. Open flounder project (branch from which the project will be generated)
2. Go to template-setup directory

```shell
cd template-setup
```
3. Run command that reverts flounder to template (7 steps and information about success should appear)

```shell
node revert-to-template.js
```
4. At the same level as flounder directory there should be "flounder-cookiecutter-template". Open that directory (you can close flounder project)
5. In flounder-cookiecutter-template directory run
```shell
yarn install
```
6. Display help for flounder commands

```shell
node index.js help
```

7. Display help for flounder generating new project command

```shell
node index.js new --help
```

8. Generate new project
```shell
node index.js new ~/path-to-project --client=EXAMPLE_CLIENT --project=EXAMPLE_PROJECT
```

Usage of locally generated project is the same as for project generated with flounder package (flounder new ...)

Important (when generating project with mobile app)!!!  
All characters in project name must be alphanumeric or an underscore [a-zA-Z0-9_]
