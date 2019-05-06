Component Apis for React
---------------------------

Interact with your react components from your end-to-end tests.

# Getting started

1. Install react-capi for puppeteer

    `yarn add -D https://github.com/xolvio/react-capi-puppeteer`

2. Hook into puppeteer

    `require('react-capi-puppeteer')(puppeteer);`
    
3. Use page.findReactComponent to find and interact with React components

    ```js
    const ExampleComponent = require('../example-app/example-app-component');

    const handle = await page.findReactComponent(ExampleComponent);

    expect(await handle.exists()).to.be.true;
    ```

# What you can do

1. Find your react component
2. Interact with it via the browser
    
    ```js
    const ExampleComponent = require('../example-app/example-app-component');

    const handle = await page.findReactComponent(ExampleComponent);
    const elementHandle = handle.getElementHandle();

    await elementHandle.click();
    expect(await page.evaluate(function (element) {
      return element.active;
    }, element)).to.be.true;
    ```

3. Interact with your component's api directly

# Reference Docs

The docs are [here](docs)

# TODO

This project is in progress, the following still need to be done at a minimum:

1. Expose a basic api for interacting with component nodes (click, getText, getHtml, etc.)
2. Expose the api of your react component on the Capi