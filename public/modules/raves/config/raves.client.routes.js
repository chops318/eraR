'use strict';

//Setting up route
angular.module('raves').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('listRaves', {
			url: '/raves',
			templateUrl: 'modules/raves/views/list-raves.client.view.html'
		}).
		state('createRave', {
			url: '/raves/create',
			templateUrl: 'modules/raves/views/create-rave.client.view.html'
		}).
		state('viewProduct', {
			url: '/raves/:raveId',
			templateUrl: 'modules/raves/views/view-rave.client.view.html'
		}).
		state('editProduct', {
			url: '/raves/:raveId/edit',
			templateUrl: 'modules/raves/views/edit-rave.client.view.html'
		});
	}
]);