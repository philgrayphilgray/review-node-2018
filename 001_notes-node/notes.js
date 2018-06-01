const fs = require('fs');

const fetchNotes = () => {
  try {
    const noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (error) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  const note = {
    title,
    body
  };

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  console.log(`Getting all notes...`);
  return fetchNotes();
};

const getNote = title => {
  console.log(`Getting note .... ${title}`);
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

const removeNote = title => {
  console.log(`Removing note .... ${title}`);
  const notes = fetchNotes();
  const fetchedNotes = notes.filter(note => note.title !== title);
  saveNotes(fetchedNotes);

  return notes.length !== fetchedNotes.length;
};

const logNote = note => {
  debugger;
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = { addNote, getAll, getNote, removeNote, logNote };
