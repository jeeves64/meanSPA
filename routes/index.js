module.exports = function (app) {
	require('./main')(app);
	require('./location')(app);
};