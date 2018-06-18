const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public/');
const PORT = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected.');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app.',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the chat.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', newMessage => {
    io.emit('newMessage', {
      ...newMessage,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   ...newMessage,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

console.log(publicPath);
