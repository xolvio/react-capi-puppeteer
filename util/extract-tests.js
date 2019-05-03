const fs = require('fs');
const path = require('path');
var marked = require('marked');

function extractTestsFromFile(source, destination) {
  const sourceContent = fs.readFileSync(source, 'utf-8');

  var renderer = new marked.Renderer();

  for (var i in renderer) {
    if ("function" === typeof renderer[i]) {
      renderer[i] = function () { return ''; };
    }
  }

  var blocks = [];

  renderer.code =
    function (src, language, escaped) {
      if (language === 'js') {
        blocks.push(src);
      }
      return '';
    };

  renderer.listitem = function (text) { return text; };
  renderer.list = function (body, ordered) { return body; };

  marked(sourceContent, { renderer: renderer });

  const filename = path.parse(source).name;
  fs.writeFileSync(
    path.join(destination, filename + '-test.js'),
    [
      `const { expect } = require('chai');`,
      `describe("${filename}", function () {`,
      `  this.timeout(3000);`,
      `  this.slow(1000);`,
      `  let page;`,
      `  beforeEach(async function () {`,
      `    page = await this.browser.newPage();`,
      `    await page.goto("http://localhost:3000");`,
      `  });`,
      blocks.map((block, i) => {
        return `  it("Example ${i + 1}", async function () {\n${
          block.split('\n').map(line => `    ${line}`).join('\n')
        }\n  })`
      }).join('\n'),
      `})`,
    ].join('\n'),
    'utf-8'
  );
}

function extractTestsFromDirectory(source, destination) {
  fs.readdirSync(source).forEach(file => extractTestsFromFile(file, destination));
}

module.exports = function extractTests(source, destination) {
  source.forEach(src => {
    if (fs.statSync(src).isDirectory()) {
      extractTestsFromDirectory(src, destination);
    } else {
      extractTestsFromFile(src, destination);
    }
  })
}