const { expect } = require('chai');
describe("exists", function () {
  this.timeout(3000);
  this.slow(1000);
  let page;
  beforeEach(async function () {
    page = await this.browser.newPage();
    await page.goto("http://localhost:3000");
  });
  it("Will return true if the handle exists", async function () {
    const ExampleComponent = require('../example-app/example-app-component');
    
    const handle = await page.findReactComponent(ExampleComponent);
    
    expect(await handle.exists()).to.be.true;
  })
  it("Will return false if the handle does not exist", async function () {
    const UnusedComponent = require('../example-app/example-unused-component');
    
    const handle = await page.findReactComponent(UnusedComponent);
    
    expect(await handle.exists()).to.be.false;
  })
  it("Example 3", async function () {
    const UnusedComponent = require('../example-app/example-unused-component');
    
    const handle = await page.findReactComponent(UnusedComponent);
    
    expect(await handle.error).to.exist;
  })
})