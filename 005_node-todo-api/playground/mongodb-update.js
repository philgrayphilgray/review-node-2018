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

    // todosCollection
    //   .findOneAndUpdate(
    //     { _id: new ObjectID('5b22af5594b98d16e8219a91') },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     { returnOriginal: false }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   });

    usersCollection
      .findOneAndUpdate(
        { _id: ObjectID('5b22ae2bf755be9961eb5bb3') },
        { $inc: { age: 1 }, $set: { name: 'Phil2' } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    // client.close()
  }
);
