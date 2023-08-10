const express = require("express");
const path = require("path");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("./public/assets/js/utils");
const uid = require("./public/assets/js/idGen");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Gets notes from ./db/db.json

app.get("/api/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// Adds new notes entered in notes.html to db.json

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const userNote = {
    title,
    text,
    id: uid(),
  };
  readAndAppend(userNote, "./db/db.json");
  res.json(response);
});

// Deletes note pressed by reading db.json, filter the DB for all IDs that aren't equal to note pressed, and writes file back to db.json

app.delete("/api/notes/:id", (req, res) => {
  const parsedDB = JSON.parse(fs.readFileSync("./db/db.json"));

  const newDB = parsedDB.filter((userNote) => userNote.id !== req.params.id);
  writeToFile("./db/db.json", newDB);
  res.json(newDB);
});

// direct user to page based on URL. Wildcard routes to Notes page.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
