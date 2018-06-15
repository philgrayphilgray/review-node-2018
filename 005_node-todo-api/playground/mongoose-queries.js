var { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/Todo');
var { User } = require('../server/models/User');

const _id = '5b22c1d35c6ecba2cdacea8f';
const userId = '5b22b71ffd76de9d1e80c852';

// if (!ObjectID.isValid(_id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id
// }).then(todos => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById({
//   _id
// })
//   .then(todo => {
//     console.log('Todo by ID', todo);
//   })
//   .catch(e => console.log(e));

const isValid = id => ObjectID.isValid(id);

isValid(userId)
  ? User.findById({
      _id: userId
    })
      .then(user => {
        console.log(user);
      })
      .catch(e => {
        console.log(e);
      })
  : console.log('User is not valid.');
