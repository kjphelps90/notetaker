const notes = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile("./db/db.json").then((data) => (JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
  const newNote = {
      title,
      text,
      id: uuid()
  };

  readAndAppend(newNote, './db/db.json');
  res.json("New note added");
} else {
    res.error("Error in adding note");
}
});