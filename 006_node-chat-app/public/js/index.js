const socket = io();
socket.on('connect', function() {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'test2@test.com',
    text: 'Yes!'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log('Got new message: ', message);
});
