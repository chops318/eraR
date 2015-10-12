'use strict';

//Setting up route
angular.module('apps').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('listApps', {
			url: '/apps',
			templateUrl: 'modules/apps/views/list-apps.client.view.html'
		}).
		state('createApps', {
			url: '/apps/create',
			templateUrl: 'modules/apps/views/create-app.client.view.html'
		}).
		state('viewApp', {
			url: '/apps/:appId',
			templateUrl: 'modules/apps/views/view-app.client.view.html'
		}).
		state('editApp', {
			url: '/apps/:appdId/edit',
			templateUrl: 'modules/apps/views/edit-app.client.view.html'
		});
	}
]);
