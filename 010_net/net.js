process.stdout.write('\u0018[2J\u0018[0;0f');
let counter = 0;
const server = require('net').createServer();
let sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket => {
  socket.id = counter++;
  console.log(`Client ${socket.id} connected.`);
  socket.write('Please type your name: ');

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key) return;
      cs.write(`${socket.name} (${timestamp()}): `);
      cs.write(data);
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log(`Client ${socket.id} disconnected.`);
  });
});

server.listen(8000, () => console.log('Server bound'));
