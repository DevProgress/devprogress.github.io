const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(require('connect-livereload')({
  port: 35729,
}));

app.use(express.static(__dirname));

app.listen(3000);
