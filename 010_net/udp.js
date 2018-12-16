const dgram = require('dgram');
const PORT = 3333;
const HOST = '127.0.0.1';

/* Server */
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  console.log('UDP server listening....');
});
server.on('message', (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

server.bind(PORT, HOST);

/* Client */

const client = dgram.createSocket('udp4');
const msg = Buffer.from('Testing....');

client.send(msg, 0, 4, PORT, HOST, err => {
  if (err) throw err;
  console.log('UDP message sent');

  client.send(msg, 4, 9, PORT, HOST, err => {
    if (err) throw err;
    console.log('UDP message sent');
    client.close();
  });
});
