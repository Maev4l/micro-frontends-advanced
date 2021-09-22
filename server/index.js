const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const plugins = [];
app.get("/plugins", (req, res) => {
  const plugins = [];
  fs.readdirSync(path.join(__dirname, "..", "shell", "__plugins")).forEach(
    (file) => {
      plugins.push(file);
    }
  );
  res.send(plugins);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
