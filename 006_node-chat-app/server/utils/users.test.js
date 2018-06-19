const expect = require('expect');
const { Chance } = require('chance');
const { includes } = require('lodash');
const { Users } = require('./users');

const chance = new Chance();
const generateRandomUser = () => {
  return {
    id: chance.guid(),
    name: chance.name(),
    room: chance.string()
  };
};

const numUsers = 3;
let users;

beforeEach(() => {
  users = new Users();
  for (let i = 0; i < numUsers; i++) {
    const { id, name, room } = generateRandomUser();
    users.addUser(id, name, room);
  }
});

describe('Users', () => {
  it('should add new user', () => {
    const newUser = generateRandomUser();
    users.addUser(newUser.id, newUser.name, newUser.room);
    const lastUser = users.users[users.users.length - 1];
    expect(lastUser).toEqual(newUser);
  });

  it('should remove user and return user that was removed', () => {
    const lastUser = users.users[users.users.length - 1];
    const removedUser = users.removeUser(lastUser.id);
    expect(removedUser).toEqual(lastUser);
    expect(includes(users.users, removedUser)).toBeFalsy();
  });

  it('should not remove a user for a user id that doen not exist', () => {
    const notUser = generateRandomUser();
    const removedUser = users.removeUser(notUser.id);
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(numUsers);
  });

  it('should return user by id', () => {
    const userToGet =
      users.users[chance.integer({ min: 0, max: numUsers - 1 })];
    const returnedUser = users.getUser(userToGet.id);
    expect(returnedUser).toMatchObject(userToGet);
  });

  it('should not return a user for a user id that does not exist', () => {
    const notUser = generateRandomUser();
    const returnedUser = users.getUser(notUser.id);
    expect(returnedUser).toBeFalsy();
  });

  it('should return a list of all users in a room', () => {
    const testUser = users.users[chance.integer({ min: 0, max: numUsers - 1 })];
    const usersInRoom = users.getUserList(testUser.room);
    expect(usersInRoom).toMatchObject([testUser.name]);
  });
});
