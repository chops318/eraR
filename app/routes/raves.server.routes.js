'use strict';

module.exports = function(app) {
	var raves = require('../controllers/raves.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');
	
	app.route('/raves')
		.get(raves.list)
		.post(apiAuth, users.requiresLogin, raves.create);

	app.route('/raves/:ravesId')
		.get(raves.read)
		.put(apiAuth, users.requiresLogin, raves.update)
		.delete(apiAuth, users.requiresLogin, raves.delete);

	// Finish by binding the article middleware
	app.param('raveId', raves.getByID);
};