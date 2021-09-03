const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newTask = {
      title,
      text,
      id: uuid()
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        const parsedTasks = JSON.parse(data);

        parsedTasks.push(newTask);

        fs.writeFile("./db/db.json", JSON.stringify(parsedTasks, null, 4),
        (writeErr) => writeErr ? console.log(writeErr) : console.log("Review updated successfully")
        );
      }
    });

    const response = {
      status: "success",
      body: newTask
    };
    console.log(response);
    res.status(201).json(response);
  }
  else {
    res.status(500).json("Error in posting review")
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


