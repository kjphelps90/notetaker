const express = require("express");

const notesRoute = require("./notes");

const app = express.Router();

app.use("./notes", notesRoute);

module.exports = app;