'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('apps').factory('Apps', ['$resource',
	function($resource) {
		return $resource('apps/:appId', { categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
