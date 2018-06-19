class Users {
  constructor(id, name) {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const removed = this.getUser(id);
    if (removed) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return removed;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = { Users };
