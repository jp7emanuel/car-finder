const mongoose = require('mongoose');
const express = require('express');
const app = express();

let makerSchema = mongoose.Schema({
  name: String
});

let Maker = mongoose.model('Makers', makerSchema);

app.get("/carfinder/makers", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Maker.find({}).exec(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = app;
