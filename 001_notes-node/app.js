const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const commandOptions = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: commandOptions.title,
    body: commandOptions.body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: commandOptions.title
  })
  .command('remove', 'Remove a note', {
    title: commandOptions.title
  })
  .help().argv;
const command = argv._[0];
console.log(`Command: ${command}`);
console.log(`Yargs ${JSON.stringify(argv)}`);

switch (command) {
  case 'add':
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log(`Note created.`);
      notes.logNote(note);
    } else {
      console.log('Note cannot be created.');
    }
    break;
  case 'list':
    const allNotes = notes.getAll();
    if (allNotes.length > 0) {
      console.log(`Logging ${allNotes.length} note(s)...`);
      // log each note individually
      allNotes.forEach(note => notes.logNote(note));
    } else {
      console.log('No notes found.');
    }

    break;
  case 'read':
    const noteToRead = notes.getNote(argv.title);
    if (noteToRead) {
      console.log(`Note found`);
      notes.logNote(noteToRead);
      return noteToRead;
    } else {
      console.log(`Note ${argv.title} not found.`);
    }
    break;
  case 'remove':
    const noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved ? `Note removed.` : `Nothing to remove.`;
    console.log(message);
    break;
  default:
    console.log('Command not recognized.');
    break;
}
