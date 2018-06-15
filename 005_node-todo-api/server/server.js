require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');

const app = express();

const port = process.env.PORT;

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
      res.send({ todo });
    })
    .catch(e => res.status(400).send(e));
});

app.delete('/todos/:id', (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(_id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => res.status(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
  const _id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate({ _id }, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
