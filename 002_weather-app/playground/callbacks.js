const getUser = (id, callback) => {
  const user = {
    id,
    name: 'Phil'
  };
  console.log('requesting...');
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, user => {
  console.log(user);
});
