const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let carSchema = mongoose.Schema({
  name: String,
  maker: {  type: mongoose.Schema.Types.ObjectId, ref: 'Makers' }
});

let Car = mongoose.model('Cars', carSchema);

app.get("/carfinder/cars", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Car.find({}).populate('maker').exec(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/carfinder/cars/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Car.findOne({ '_id': req.params.id }).populate('maker').exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/carfinder/cars", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let newCAr = new Car(req.body);

  newCAr.save(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.put("/carfinder/cars/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let updateDoc = req.body;
  delete updateDoc._id;

  Car.update({ _id: req.params.id }, { $set: updateDoc}).exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.delete("/carfinder/cars/:id", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  Car.findOne({ '_id': req.params.id }).remove({}).exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = app;
