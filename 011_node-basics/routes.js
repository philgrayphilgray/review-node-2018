const fs = require('fs');

const readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

module.exports = (req, res, err) => {
  const { url, method } = req;

  // 'GET /', 'GET /users' or 'POST /create-user'
  const requestString = `${method} ${url}`;

  switch (requestString) {
    // GET routes
    case 'GET /':
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write(
        '<body><header><h1>Welcome!</h1><nav><ul><li><a href="/users">Users</a></li></ul></nav></header><main><form action="/create-user" method="post"><h2>Create New User</h2><label for="username">Username: </label><input type="text" id="username" name="username"/><button type="submit">Create User</button></form></main></body>'
      );
      res.write('</html>');
      res.end();
      break;
    case 'GET /users':
      res.setHeader('Content-Type', 'text/html');
      return readJson('./users.json', (err, users) => {
        res.write('<html>');
        res.write(
          '<body><header><nav><ul><li><a href="/">Home</a></li></ul></nav></header><main><ul>'
        );
        if (err) {
          res.write('<li>');
          res.write('No users...');
          res.write('</li>');
        } else {
          users.forEach(user => {
            res.write('<li>');
            res.write(user.username);
            res.write('</li>');
          });
        }

        res.write('</ul></main></body></html>');
        res.end();
      });
      break;
    // POST routes
    case 'POST /create-user':
      const body = [];
      req.on('data', chunk => {
        body.push(chunk);
      });
      return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const username = parsedBody.split('=')[1];
        return readJson('./users.json', (err, users) => {
          if (err) throw err;
          // get the max id value and add 1
          const id = Math.max(...users.map(user => user.id)) + 1;
          const newUser = { id, username };
          users.push(newUser);
          return fs.writeFile('./users.json', JSON.stringify(users), err => {
            if (err) throw err;
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
          });
        });
      });
    default:
      break;
  }
};
