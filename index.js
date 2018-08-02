var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');

var handleError = function (err, res) {
  res.writeHead(404);

   // res.writeHead(404, { "Location": '/app/error.html' });

   //res.redirect('/app/error.html');

  res.end();
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
     //handleError(err, res);
      res.writeHead(302, { "Location": "http://" + req.headers['host'] + '/app/error.html' });

      return res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000);
