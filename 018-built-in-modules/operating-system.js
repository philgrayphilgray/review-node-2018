const os = require('os');

console.log(os);
console.log(`free memory: ${os.freemem()}`);
console.log(`os type: ${os.type()}`);
console.log(`os release: ${os.release()}`);

const { username, homedir, shell } = os.userInfo();
console.log(`username: ${username}`);
console.log(`home directory: ${homedir}`);
console.log(`shell: ${shell}`);
