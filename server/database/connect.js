const mongoose = require('mongoose');

module.exports.connect = (app) => {
  mongoose.connect(process.env.REACT_APP_MONGO_HOST);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // Initialize the app.
      var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
      });
    });
};
