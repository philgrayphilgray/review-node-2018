const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) return console.error('Unable to connect to MongoDB server.', err);
    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');
    const collection = name => db.collection(name);

    const todosCollection = collection('Todos');
    const usersCollection = collection('Users');

    // deleteMany Exercise
    const name = 'Phil';

    usersCollection.deleteMany({ name }).then(result => {
      console.log(result);
    });

    // findOneAndDelete Exercise

    const _id = new ObjectID('5b1dc64b7960238fe38eaa78');

    usersCollection.findOneAndDelete({ _id }).then(result => {
      console.log(result);
    });

    // const text = 'Eat lunch';

    // // deleteMany
    // todosCollection.deleteMany({ text }).then(result => {
    //   console.log(result);
    // });

    // //deleteOne

    // todosCollection.deleteOne({ text }).then(result => {
    //   console.log(result);
    // });

    // //findOneAndDelete

    // todosCollection.findOneAndDelete({ completed: false }).then(result => {
    //   console.log(result);
    // });

    // client.close()
  }
);
