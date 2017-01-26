const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cors = require('cors');

app.use(express.static('./public'));
app.use(cors());
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/carfinder');
var PORT = 8081;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Initialize the app.
    var server = app.listen(PORT, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

var makerSchema = mongoose.Schema({
    name: String
});

var carSchema = mongoose.Schema({
   name: String,
   _maker: [{  type: mongoose.Schema.Types.ObjectId, ref: 'Makers' }]
});

var Maker = mongoose.model('Makers', makerSchema);
var Car = mongoose.model('Car', carSchema);

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

app.post("/carfinder/cars", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    var newCAr = new Car({
       name: req.body.name,
       _maker: req.body.maker
    });

    newCAr.save(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get objects.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.get("/carfinder/cars", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    Car.find({}).populate('_maker').exec(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get objects.");
        } else {
            res.status(200).json(docs);
        }
    });
});
