Component Apis for React with Puppeteer
---------------------------

Interact with your react components from your end-to-end tests.

# Getting started

`yarn add -D https://github.com/xolvio/react-capi-puppeteer`

In your tests create a ReactCapi instance and use it to interact with your react components.

```js
const makeCapi = require('react-capi-puppeteer');
const ExampleComponent = require('./my-app-components/example-app-component');

const capi = await makeCapi(page, ExampleComponent);

expect(await capi.exists()).to.be.true;
```

# TODO

This project is in progress, the following still need to be done at a minimum:

1. Expose a basic api for interacting with component nodes (click, getText, getHtml, etc.)
2. Expose the api of your react component on the Capi