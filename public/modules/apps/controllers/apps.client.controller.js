'use strict';

// Apps controller
angular.module('apps').controller('AppsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Apps',
	function($scope, $stateParams, $location, Authentication, Apps) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	  	// Page changed handler
	  	$scope.pageChanged = function() {
	   	$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	  	};

		// Create new App
		$scope.create = function() {
			// Create new App object
			var app = new Apps ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			app.$save(function(response) {
				$location.path('apps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing App
		$scope.remove = function(app) {
			if ( app ) { 
				app.$remove();

				for (var i in $scope.apps) {
					if ($scope.apps [i] === app) {
						$scope.apps.splice(i, 1);
					}
				}
			} else {
				$scope.app.$remove(function() {
					$location.path('apps');
				});
			}
		};

		// Update existing Category
		$scope.update = function() {
			var app = $scope.app;

			app.$update(function() {
				$location.path('apps/' + app._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Categories
		$scope.find = function() {
			$scope.apps = Apps.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.app = Apps.get({ 
				appId: $stateParams.appId
			});
		};

		// Search for a category
		$scope.categorySearch = function(product) {
			$location.path('apps/' + product._id);
		};
	}
]);
