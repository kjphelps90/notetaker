const notes = require("express").Router();
const { readFromFile, writeToFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("uuid");

notes.get("/", (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully!");
    }
    else {
        res.error("error in posting note.")
    }
});