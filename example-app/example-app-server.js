module.exports = function startServer(port) {
  var http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs');

  var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

  return http.createServer(function(req, res) {
    var pathPart = url.parse(req.url).pathname;
    var filename = path.join(__dirname, pathPart);

    if (path.normalize(filename) == path.normalize(__dirname + '/')) {
      filename = path.join(__dirname, 'example-app.html');
    }

    var exists = fs.existsSync(filename);
    if (! exists) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Not Found\n');
      res.end();
      return;
    }
    
    var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
    res.writeHead(200, mimeType);

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  }).listen(port);
}