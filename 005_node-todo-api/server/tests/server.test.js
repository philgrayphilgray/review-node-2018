const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/Todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

const todosUrl = '/todos/';

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post(todosUrl)
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post(todosUrl)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get(todosUrl)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    const url = todosUrl + todos[0]._id;
    console.log(url);
    request(app)
      .get(url)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return 404 if todo not found', done => {
    const fakeId = new ObjectID();
    const url = todosUrl + fakeId;
    console.log(url);

    request(app)
      .get(url)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids', done => {
    const invalidId = '123';
    const url = todosUrl + invalidId;
    console.log(url);

    request(app)
      .get(url)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const { _id } = todos[1];
    const url = todosUrl + _id;
    console.log(url);
    request(app)
      .delete(url)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(_id.toHexString());
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(_id.toHexString())
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });
  it('should return 404 if the todo not found', done => {
    const fakeId = new ObjectID();
    const url = todosUrl + fakeId;
    console.log(url);
    request(app)
      .delete(url)
      .expect(404)
      .end(done);
  });

  it('should should return 404 if object id is invalid', done => {
    const invalidId = '123';
    const url = todosUrl + invalidId;
    console.log(url);
    request(app)
      .delete(url)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    const { _id } = todos[1];
    const url = todosUrl + _id;
    const text = 'Walk dog.';

    request(app)
      .patch(url)
      .send({ text, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });
  it('should clear completedAt when todo is not completed', done => {
    const { _id } = todos[1];
    const url = todosUrl + _id;
    const text = 'Brush teeth.';

    request(app)
      .patch(url)
      .send({ text, completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
