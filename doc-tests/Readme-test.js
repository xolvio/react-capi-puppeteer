const { expect } = require('chai');
describe("Readme", function () {
  this.timeout(3000);
  this.slow(1000);
  let page;
  beforeEach(async function () {
    page = await this.browser.newPage();
    await page.goto("http://localhost:3000");
  });
  it("Use page.findReactComponent to find and interact with React components", async function () {
     const ExampleComponent = require('../example-app/example-app-component');
    
     const handle = await page.findReactComponent(ExampleComponent);
    
     expect(await handle.exists()).to.be.true;
  })
  it("Interact with it via the browser", async function () {
     const ExampleComponent = require('../example-app/example-app-component');
    
     const handle = await page.findReactComponent(ExampleComponent);
     const elementHandle = await handle.getElementHandle();
    
     await elementHandle.click();
     expect(await page.evaluate(function (element) {
       return document.activeElement === element;
     }, elementHandle)).to.be.true;
  })
})