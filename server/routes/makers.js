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

app.get("/carfinder/makers/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Maker.findOne({ '_id': req.params.id }).exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/carfinder/makers", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let newMaker = new Maker(req.body);

  newMaker.save(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.put("/carfinder/makers/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let updateDoc = req.body;
  delete updateDoc._id;

  Maker.update({ _id: req.params.id }, { $set: updateDoc}).exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.delete("/carfinder/makers/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Maker.findOne({ '_id': req.params.id }).remove({}).exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = app;
