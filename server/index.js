import express from 'express';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();
const port = 3030;

const plugins = [];
app.get('/api/plugins', (req, res) => {
  // May come from a database
  const plugins = yaml.load(fs.readFileSync(path.resolve(__dirname, 'plugins.yaml'), 'utf8'));
  res.send({ plugins });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
