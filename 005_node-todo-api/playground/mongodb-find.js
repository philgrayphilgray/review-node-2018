const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) return console.error('Unable to connect to MongoDB server.', err);
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Users')
      .find({ name: 'Phil' })
      .toArray()
      .then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
      })
      .catch(err => console.error(err));
  }
);
