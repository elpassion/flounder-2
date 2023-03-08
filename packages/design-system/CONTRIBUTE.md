# TACO - design system

Project with basic components to reuse in other projects.

## TLDR

The idea behind this project is to work similar to [tailwindui](https://tailwindui.com/components) meaning logicless styled components using tailwind classes. You have to manualy copy the component code and add your own logic. In theory it should allow FE developers to work when wireframes are ready. <br><br>
Sample projects:

- [repo 1](https://github.com/elpassion/test-elp-design-system-brief-1)
- [repo 2](https://github.com/elpassion/test-elp-design-system-brief-2)

## How to use this library

### Install dependencies

```bash
$ pnpm install
```

### Copy files

In order to use this project you'll have to copy configuration file. Start with [tailwind.config.js](https://github.com/elpassion/design-system/blob/main/tailwind.config.js). Then copy [prettierrc.json](https://github.com/elpassion/design-system/blob/main/.prettierrc.json). You can use icons locally from [icons font](https://github.com/elpassion/design-system/blob/main/src/fonts/fonticon.ttf) or use cdn [https://elpassion-design-system.s3.eu-west-1.amazonaws.com/fonticon.ttf](https://elpassion-design-system.s3.eu-west-1.amazonaws.com/fonticon.ttf)

## How to contribute

### Run

Run the app in the development mode:

```bash
$ pnpm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view it in the browser.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### Dark mode

We support [tailwind class strategy](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually).

## Usefull links

[**jira**](https://elpassion.atlassian.net/browse/ELPDES) <br/>
[**slack**](https://app.slack.com/client/T04RX1Z0P/C04JD9E37MY) <br/>
[**figma**](https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2054%3A3026&t=4KYtpNsJBJG5fIry-1)<br/>
[**repo**](https://github.com/elpassion/flounder-2/tree/main/packages/design-system) <br/>
[**github pages**](https://elpassion.github.io/design-system/?path=/story/intro--page) <br/>
