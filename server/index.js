require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + '/../build'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res, next){
  res.sendStatus(200);
});

require('./database/connect').connect(app);

app.use(require('./routes/cars'));
app.use(require('./routes/makers'));
