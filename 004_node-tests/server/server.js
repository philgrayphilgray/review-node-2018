const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.get('/users', (req, res) => {
  const users = [{ name: 'Phil', age: 31 }, { name: 'Cheongah', age: 30 }];
  res.status(200).send(users);
});

app.listen(3000);

module.exports.app = app;
