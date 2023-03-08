## Installation

### TACO UI

TACO UI is a system of React components highly based on tailwindcss, it is available as an [npm package](#).
[See full documentation here](https://elpassion.github.io/design-system/?path=/story/intro--page) via storybook

**npm:**

```sh
p/npm install @elpassion/taco
```

**yarn:**

```sh
yarn add @elpassion/taco
```

### Copy files

In order to use this library you'll have to generate tokens file and wire it to your tailwind config with `funtionc()`.

### Optionally (WIP) (Now it's still required for some compoennts to work)

You can use icons locally from [icons font](https://github.com/elpassion/design-system/blob/main/src/fonts/fonticon.ttf) or use cdn [https://elpassion-design-system.s3.eu-west-1.amazonaws.com/fonticon.ttf](https://elpassion-design-system.s3.eu-west-1.amazonaws.com/fonticon.ttf)

Then use it in your app for example:

```js
import React from 'react';
import Button from '@elpassion/taco';

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <Button {...props} />
    </div>
  );
}
```

## Optionally
