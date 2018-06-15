var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

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

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => res.status(400).send(e)
  );
});

app.get('/todos/:id', (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  Todo.findById({ _id })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo, success: true });
    })
    .catch(e => res.status(400).send(e));
});

app.listen(3000, () => {
  console.log(`Started on port 3000`);
});

module.exports = {
  app
};
