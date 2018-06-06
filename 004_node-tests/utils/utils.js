module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 0);
};

module.exports.sqaure = x => x * x;

module.exports.asyncSquare = (x, callback) => {
  setTimeout(() => {
    callback(x * x);
  }, 0);
};

module.exports.setName = (user, fullName) => {
  const names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

module.exports.asyncSetName = (user, fullName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const names = fullName.split(' ');
      user.firstName = names[0];
      user.lastName = names[1];
      resolve(user);
    }, 0);
  });
};
