Component Apis for React
---------------------------

Interact with your react components from your end-to-end tests.

# Getting started

1. Install react-capi for puppeteer

    `yarn add -D https://github.com/xolvio/react-capi-puppeteer`

2. Hook into puppeteer

    `require('react-capi-puppeteer')(puppeteer);`
    
3. In your tests create a ReactCapi instance and use it to interact with your react components.

    ```js
    const ExampleComponent = require('../example-app/example-app-component');

    const handle = await page.findReactComponent(ExampleComponent);

    expect(await handle.exists()).to.be.true;
    ```

# TODO

This project is in progress, the following still need to be done at a minimum:

1. Expose a basic api for interacting with component nodes (click, getText, getHtml, etc.)
2. Expose the api of your react component on the Capi