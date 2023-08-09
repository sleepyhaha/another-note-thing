const express = require("express");
const path = require("path");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("./public/assets/js/utils");
const uid = require("./public/assets/js/idGen");
const { readSync } = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

app.post("/api/notes", (req, res) => {
  const { title, body } = req.body;
  const userNote = {
    title,
    body,
    uid: uid(),
  };
  readAndAppend(userNote, "./db/db.json");
  res.json(response);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
