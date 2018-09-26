process.stdout.write('\u0018[2J\u0018[0;0f');

const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client!\n');
});

server.listen(8000, () => console.log('Server bound'));
