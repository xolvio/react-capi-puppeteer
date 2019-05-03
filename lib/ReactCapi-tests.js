const puppeteer = require('puppeteer');
const { expect } = require('chai');

const ExampleComponent = require('../example-app/example-app-component');
const makeCapi = require('./ReactCapi');

describe('ReactCapi', function () {
  this.timeout(3000);
  this.slow(1000);
  let browser, server;
  before(async function () {
    browser = await puppeteer.launch();
    server = require('../example-app/example-app-server')(3000);
  })
  describe('makeCapi', function () {

  });
  describe('exists', function () {
    it('should return true if the component can be found', async function () {
      const page = await browser.newPage();
      await page.goto('http://localhost:3000');

      const capi = await makeCapi(page, ExampleComponent);

      expect(await capi.exists()).to.be.true;
    });
    it('should return false if the component cannot be found', async function () {
      const page = await browser.newPage();
      await page.goto('http://localhost:3000');

      const capi = await makeCapi(page, class FakeComponent {});

      expect(await capi.exists()).to.be.false;
    });
  });
  after(function () {
    browser.close();
    server.close();
  })
})