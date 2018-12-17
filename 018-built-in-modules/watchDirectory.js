const fs = require('fs');
const path = require('path');

/* Watch a directory and report when a file was added, removed, or changed */

const dirname = path.join(__dirname, 'logs');
const currentFiles = fs.readdirSync(dirname);

const logWithTime = message =>
  console.log(`${new Date().toUTCString()}: ${message}`);

fs.watch(dirname, (eventType, filename) => {
  /* eventType rename is used for add or delete */

  if (eventType === 'rename') {
    const index = currentFiles.indexOf(filename);

    /* it's already in the currentFiles array, so it must have been deleted */
    if (index >= 0) {
      currentFiles.splice(index, 1);
      logWithTime(`${filename} was removed`);
      return;
    }

    /* it wasn't in currentFiles, therefore, it was added  */

    currentFiles.push(filename);
    logWithTime(`${filename} was added`);
    return;
  }

  /* it wasn't a rename event, so the file was changed; eventType === 'change'*/

  logWithTime(`${filename} was changed`);
});
