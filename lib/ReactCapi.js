class ReactCapi {
  constructor(page, component) {
    this.name = component.name;
    this.handle = page.evaluateHandle(function (name) {
      return resq.resq$(name);
    }, this.name);

    // use this or similar to expose the component api: https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging
  }

  async exists() {
    return !! await this.handle.then(() => true).catch(e => false);
  }
}


async function makeCapi(page, component) {
  const needsInstall = await page.evaluate(function () {
    return typeof resq === 'undefined';
  });
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