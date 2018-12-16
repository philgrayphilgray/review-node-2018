const dns = require('dns');

// dns.resolve('thephilgray.com',  (err, address) => {
//   console.log(address);
// });

// dns.resolve4('thephilgray.com',  (err, address) => {
//   console.log(address);
// });

// dns.resolve('thephilgray.com',  (err, address) => {
//   console.log(address);
// });

// dns.resolveMx('thephilgray.com', (err, address) => {
//   console.log(address);
// });

dns.reverse('64.98.145.30', (err, hostnames) => {
  console.log(hostnames);
});
