var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
var gracefulShutdown;

// Start the connection
mongoose.connect(dbURI);

// Console messages
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// Mongoose disconnect on shutdown
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// Event listeners
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./location');