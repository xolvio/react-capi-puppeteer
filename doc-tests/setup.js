const puppeteer = require('puppeteer');

before(async function () {
  this.browser = await puppeteer.launch();
  this.server = require('../example-app/example-app-server')(3000);
});

after(async function () {
  this.browser.close();
  this.server.close();
});