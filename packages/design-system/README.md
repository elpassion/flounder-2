## Installation

### TACO UI

TACO UI is a system of React components highly based on tailwindcss, it is available as an [npm package](#).

**npm:**

```sh
p/npm install @elpassion/taco
```

**yarn:**

```sh
yarn add @elpassion/taco
```

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
