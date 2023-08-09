const express = require("express");
const path = require("path");
const api = require("./public/assets/js/index");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.statis("public"));

app.get("/", (req, res) =>
  res.sendfile(path.join(__dirname, "./public/assets/js/index.js"))
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
