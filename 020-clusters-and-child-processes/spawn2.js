const { spawn } = require('child_process');


/* shell mode */
// const child = spawn('find', ['.', '-type', 'f'], {
//     stdio: 'inherit',
//     shell: true
// })

/* different cwd */
// const child = spawn('find . -type f | wc -l', {
//     stdio: 'inherit',
//     shell: true,
//     cwd: '/Users/phillipgray/Downloads'
// })


/* can set and access environment variable */

const child = spawn('echo $ANSWER', {
    stdio: 'inherit',
    shell: true,
    env: {ANSWER: 42}
})