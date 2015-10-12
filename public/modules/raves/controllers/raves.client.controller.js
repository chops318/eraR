'use strict';

// Products controller
angular.module('raves').controller('RavesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Raves', 'Apps', '$filter',
	function($scope, $stateParams, $location, Authentication, Raves, Apps, $filter) {
		$scope.authentication = Authentication;
		$scope.apps = Apps.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Product
		$scope.create = function() {
			var rave = new Raves ({
				name: this.name,
				app: this.app,
				about: this.about,
				whyUse: this.whyUse,
				problem: this.problem,
				howLong: this.howLong,
				howUse: this.howUse,
				whyShould: this.whyShould,
				drawbacks: this.drawbacks,
				howSolve: this.howSolve,
				favorite: this.favorite,
				fans: this.fans

			});

			// Redirect after save
			rave.$save(function(response) {
				$location.path('raves/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(rave) {
			if ( rave ) {
				rave.$remove();

				for (var i in $scope.raves) {
					if ($scope.raves [i] === rave) {
						$scope.raves.splice(i, 1);
					}
				}
			} else {
				$scope.rave.$remove(function() {
					$location.path('raves');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var rave = $scope.rave;
			rave.app = rave.app._id;

			rave.$update(function() {
				$location.path('raves/' + rave._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		var appendRave = function appendApp(p) {
			// You could substitue use of filter here with underscore etc.
			p.app = $filter('filter')($scope.apps, {_id: p.app})[0];
		};

		// Find a list of Products
		$scope.find = function() {
			Raves.query(function loadedRaves(raves) {
				raves.forEach(appendRave);
				$scope.raves = raves;
			});
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.rave = Raves.get({
				raveId: $stateParams.raveId
			}, appendRave);
		};

		// Search for a product
		$scope.raveSearch = function(rave) {
			$location.path('rave/' + rave._id);
		};
	}
]);