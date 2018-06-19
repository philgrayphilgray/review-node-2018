require('./config/config');
const { pick, isBoolean } = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');
const { authenticate } = require('./middleware/authenticate.js');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });
    const doc = await todo.save();
    res.send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({
      _creator: req.user._id
    });
    res.send({ todos });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/todos/:id', authenticate, async (req, res) => {
  try {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
    }
    const todo = await Todo.findOne({ _id, _creator: req.user._id });
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
    }
    const todo = await Todo.findOneAndRemove({ _id, _creator: req.user._id });
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch('/todos/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  const body = pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  if (isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id, _creator: req.user._id },
      { $set: body },
      { new: true }
    );

    if (!todo) return res.status(404).send();
    res.send({ todo });
  } catch (e) {
    res.status(400).send();
  }
});

// Create new user

app.post('/users', async (req, res) => {
  try {
    const body = pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users

// app.get('/users', async (req, res) => {
//   User.find()
//     .then(users => {
//       res.send({ users });
//     })
//     .catch(error => res.status(400).send(error));
// });

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}

app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
