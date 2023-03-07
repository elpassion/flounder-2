# flounder-2

## Examples and packages

### Create Flounder App

See project [README.MD](./packages/create-flounder-app/README.md)

### Design system

packages/design-system is a git submodule for [Main Repository](https://github.com/elpassion/design-system), make sure to run

```bash
git submodule update
```

to get latest version of the repository

Based on some research ideally we shoudl ditch submodules and just include design system in this repo and serve it as npm package because of some issues related to rapidly developed projects this way:
[https://github.blog/2016-02-01-working-with-submodules/#advice-on-using-submodules-or-not](https://github.blog/2016-02-01-working-with-submodules/#advice-on-using-submodules-or-not)
