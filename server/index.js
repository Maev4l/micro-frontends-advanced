const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3030;

const plugins = [];
app.get("/api/plugins", (req, res) => {
  // May come from a database
  const plugins = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "plugins.json"), "utf8")
  );
  res.send({ plugins });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
