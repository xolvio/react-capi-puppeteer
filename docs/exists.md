# ReactHandle.exists

Will return true if the handle exists

```js
const ExampleComponent = require('../example-app/example-app-component');

const handle = await page.findReactComponent(ExampleComponent);

expect(await handle.exists()).to.be.true;
```

Will return false if the handle does not exist

```js
const UnusedComponent = require('../example-app/example-unused-component');

const handle = await page.findReactComponent(UnusedComponent);

expect(await handle.exists()).to.be.false;
```

You can get any error like this

```js
const UnusedComponent = require('../example-app/example-unused-component');

const handle = await page.findReactComponent(UnusedComponent);

expect(await handle.error).to.exist;
```