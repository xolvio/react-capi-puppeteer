const { expect } = require('chai');
describe("Readme", function () {
  this.timeout(3000);
  this.slow(1000);
  let page;
  beforeEach(async function () {
    page = await this.browser.newPage();
    await page.goto("http://localhost:3000");
  });

})