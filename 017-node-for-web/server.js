const server = require('http').createServer();
const fs = require('fs');

server.on('request', (req, res) => {
  //   console.log(req.url);
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync('./home.html'));
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(`.${req.url}.html`));
      break;
    case '/data':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fs.readFileSync('./data.json'));
      break;
    case '/home':
      res.writeHead(301, { Location: '/' });
      res.end();
      break;
    default:
      res.writeHead(404);
      res.end();
  }
  //   res.writeHead(200, { 'Content-Type': 'text/plain' });
  //   res.end('Hello world\n');
});

server.listen(8000);
