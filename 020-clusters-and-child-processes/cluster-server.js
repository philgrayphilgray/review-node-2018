const http = require('http');
const pid = process.pid;

let usersCount;

/* benchmark with `ab -c200 -t10 http://localhost:8080/` */
http.createServer((req, res) => {
    for(let i = 0; i<1e7; i++){
        // res.end(`Handled by process ${pid}`);
        res.write(`Handled by process ${pid}\n`);
        res.end(`Users: ${usersCount}`);
    }
}).listen(8080, () => {
    console.log(`Started process ${pid}`);
})

process.on('message', msg => {
    // console.log(`Message from master: ${msg}`);
    usersCount = msg.usersCount;
})