const path = require('path');
const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'home', path: req.route.path });
});

router.get('/users', (req, res, next) => {
  res.render('users', { pageTitle: 'users', path: req.route.path, users });
});

router.post('/add-user', (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  users.push(req.body.username);
  res.redirect('/');
});

module.exports = router;
