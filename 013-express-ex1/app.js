const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first middleware');
  next();
});

app.use((req, res, next) => {
  console.log('next middleware');
  next();
});

app.use('/users', (req, res, next) => {
  res.send(
    require('./users.json')
      .map(user => `<p>${user.name}</p>`)
      .join('')
  );
});

app.use('/', (req, res, next) => {
  res.send(
    '<h1>Home</h1><nav><ul><li><a href="/users">View Users</a></li></ul></nav>'
  );
});

app.listen(3000);
