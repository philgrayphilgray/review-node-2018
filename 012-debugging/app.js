const http = require('http');

const server = http.createServer((req, res) => {
  const lowerStr = 'i am lowercase';

  const transformStr = str => {
    str = str.replace('lower', 'upper');
    return str.toUpperCase();
  };

  res.setHeader('Content-Type', 'text/html');
  res.write(`<html><body>
        <p>${req.url === '/upper' ? transformStr(lowerStr) : lowerStr}</p>
    </body></html>`);
  res.end();
});

server.listen(3000);
