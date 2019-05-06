class ReactHandle {
  constructor(handle, component) {
    this.name = component.name;
    this.handle = handle;

    // use this or similar to expose the component api: https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging
  }

  async exists() {
    return !! this.handle;
  }

  async getElementHandle() {
    return (await this.handle.getProperty('node')).asElement()
  }
}


ReactHandle.findReactComponent = async function findReactComponent(page, component) {
  const needsInstall = await page.evaluate(function () {
    return typeof resq === 'undefined';
  });
  if (needsInstall) {
    await page.addScriptTag({
      path: ReactHandle.getResqFilePath()
    });
    await page.evaluate(function () {
      return resq.waitToLoadReact(2000);
    });
  }
  const name = component.name;
  const { handle, error } = await page.evaluateHandle(function (name) {
    return resq.resq$(name);
  }, name).then(function (handle) {
    return { handle };
  }).catch(function (error) {
    return { error };
  });

  const reactHandle = new ReactHandle(handle, component);
  reactHandle.error = error;

  return reactHandle;
}

ReactHandle.getResqFilePath = function () {
  const resqFilePath = require.resolve('resq');

  return resqFilePath;
}

module.exports = function (puppeteer) {
  if (puppeteer != require('puppeteer')) {
    throw new Error('Oops - can\'t get puppeteer page prototype, please import and use ReactHandle directly.');
  }

  const Page = require('puppeteer/lib/Page').Page;
  Page.prototype.findReactComponent = function (component) {
    return ReactHandle.findReactComponent(this, component);
  }
};

module.exports.ReactHandle = ReactHandle