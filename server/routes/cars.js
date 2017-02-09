const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname)
  }
});

var upload = multer({ storage: storage });

let carSchema = mongoose.Schema({
  name: String,
  photo: String,
  maker: {  type: mongoose.Schema.Types.ObjectId, ref: 'Makers' },
  details: String,
  year: String,
  price: String,
  featured: Boolean
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

app.post("/carfinder/cars", upload.any(), function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  req.body.photo = '/uploads/' + req.files[0].filename;
  let newCAr = new Car(req.body);

  newCAr.save(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get objects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.put("/carfinder/cars/:id", upload.any(), function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  let updateDoc = req.body;
  delete updateDoc._id;

  if (req.files.length) {
    req.body.photo = '/uploads/' + req.files[0].filename;
  }
  console.log(req.body);
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
