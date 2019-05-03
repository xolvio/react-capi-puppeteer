class ReactCapi {
  constructor(page, component) {
    this.name = component.name;
    this.handle = page.evaluateHandle(function (name) {
      return resq.resq$(name);
    }, this.name);
  }
  async exists() {
    return !! await this.handle.then(() => true).catch(e => false);
  }
}


async function makeCapi(page, component) {
  const needsInstall = await page.evaluate(function () {
    return typeof resq === 'undefined';
  });
  console.log(needsInstall);
  if (needsInstall) {
    await page.addScriptTag({
      path: makeCapi.getResqFilePath()
    });
    await page.evaluate(function () {
      return resq.waitToLoadReact(2000);
    });
  }

  return new ReactCapi(page, component);
}

makeCapi.ReactCapi = ReactCapi;
makeCapi.getResqFilePath = function () {
  const resqFilePath = require.resolve('resq');

  return resqFilePath;
}

module.exports = makeCapi;