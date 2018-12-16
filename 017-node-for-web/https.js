const fs = require('fs');

/* Generated with `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes` */

const server = require('https').createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
});

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hello world\n');
});

/* Must use port `443` for https */

server.listen(443);

/* test at https://localhost */
