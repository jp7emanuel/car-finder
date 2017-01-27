const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.static('./public'));
app.use(cors());
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

require('./database/connect').connect(app);

app.use(require('./routes/cars'));
app.use(require('./routes/makers'));
