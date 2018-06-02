const express = require('express');

const app = express();

app.get('/', (req, response) => {
  //   response.send('<h1>Hello Express</h1>');
  response.send({
    name: 'Phil',
    likes: ['Guitar', 'Beer']
  });
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(3000);
