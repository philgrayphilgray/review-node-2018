var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('../db/mongoose');
var { Todo } = require('../models/Todo');
var { User } = require('../models/User');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(error => res.status(400).send(error));
});

app.listen(3000, () => {
  console.log(`Started on port 3000`);
});
