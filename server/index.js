const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3030;

const plugins = [];
app.get("/api/plugins", (req, res) => {
  // May come from a database
  const plugins = [
    {
      url: "//localhost:3001/pluginCatalogEntry.js",
      scope: "plugin_catalog",
      module: "./Catalog",
    },
  ];
  res.send({ plugins });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
