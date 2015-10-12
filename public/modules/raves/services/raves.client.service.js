'use strict';

//Products service used to communicate Products REST endpoints
angular.module('raves').factory('Raves', ['$resource',
	function($resource) {
		return $resource('raves/:raveId', { productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);