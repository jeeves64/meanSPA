var ctrl = require('../app_server/controllers/location');

module.exports = function(app) {
	app.get('/location/:locationid', ctrl.locationInfo);
	app.get('/location/:locationid/review/new', ctrl.addReview);
  app.post('/location/:locationid/review/new', ctrl.doAddReview);
};