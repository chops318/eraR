'use strict';

module.exports = function(app) {
	var apps = require('../controllers/apps.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');
	
	app.route('/apps')
		.get(apps.list)
		.post(apiAuth, users.requiresLogin, apps.create);

	app.route('/apps/:appId')
		.get(apps.read)
		.put(apiAuth, users.requiresLogin, apps.update)
		.delete(apiAuth, users.requiresLogin, apps.delete);

	// Finish by binding the article middleware
	app.param('appId', apps.getByID);
};
