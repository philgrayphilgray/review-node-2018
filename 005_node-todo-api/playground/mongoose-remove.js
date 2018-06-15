const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/Todo');
const { User } = require('../server/models/User');

Todo.remove({}).then(res => {
  console.log(res);
});

Todo.findByIdAndRemove('5b23f76891abe0db008eff7d').then(todo => {
  console.log(todo);
});
