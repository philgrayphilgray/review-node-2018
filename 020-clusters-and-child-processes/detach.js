const {spawn} = require('child_process');

const child = spawn('node', ['timer.js'], {
    detched: true,
    stdio: 'ignore'
});

child.unref();

