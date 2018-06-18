const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/Todo');
const { User } = require('../models/User');
const {
  todos,
  populateTodos,
  users,
  populateUsers
} = require('./seed/seed.js');

const todosUrl = '/todos/';
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', done => {
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

describe('GET /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toString());
        expect(res.body.email).toBe(users[0].email.toString());
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users/', () => {
  it('should create a user', done => {
    const email = 'test@example.com';
    const password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ email })
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.password).toNotBe(password);
            done();
          })
          .catch(error => {
            return done(err);
          });
      });
  });

  it('should return validation errors if the request is invalid', done => {
    const email = 'example';
    const password = '123';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', done => {
    const email = users[0].email;
    const password = '123abc!';
    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1])
          .then(user => {
            expect(user.tokens[0]).toMatchObject({
              _id: user.tokens[0]._id,
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should reject invalid login', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + 1
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1])
          .then(user => {
            expect(user.tokens.length).toEqual(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
