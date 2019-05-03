const { expect } = require('chai');
describe("Readme", function () {
  this.timeout(3000);
  this.slow(1000);
  let page;
  beforeEach(async function () {
    page = await this.browser.newPage();
    await page.goto("http://localhost:3000");
  });
  it("Example 1", async function () {
     const makeCapi = require('react-capi-puppeteer');
     const ExampleComponent = require('../example-app/example-app-component');
    
     const capi = await makeCapi(page, ExampleComponent);
    
     expect(await capi.exists()).to.be.true;
  })
})