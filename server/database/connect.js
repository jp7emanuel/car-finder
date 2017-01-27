const mongoose = require('mongoose');

module.exports.connect = (app) => {
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
};
