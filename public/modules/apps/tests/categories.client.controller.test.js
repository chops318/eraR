'use strict';

(function() {
	// Apps Controller Spec
	describe('Apps Controller Tests', function() {
		// Initialize global variables
		var AppsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Categories controller.
			AppsController = $controller('AppsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one App object fetched from XHR', inject(function(Apps) {
			// Create sample Category using the Categories service
			var sampleApp = new Apps({
				name: 'New App',
				description: 'New App Description'
			});

			// Create a sample Categories array that includes the new Category
			var sampleApps = [sampleApp];

			// Set GET response
			$httpBackend.expectGET('apps').respond(sampleApps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.apps).toEqualData(sampleApps);
		}));

		it('$scope.findOne() should create an array with one Category object fetched from XHR using a categoryId URL parameter', inject(function(Apps) {
			// Define a sample Monkey object
			var sampleApp = new Apps({
				name: 'New App',
				description: 'New App Description'
			});

			// Set the URL parameter
			$stateParams.categoryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/apps\/([0-9a-fA-F]{24})$/).respond(sampleApp);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.app).toEqualData(sampleApp);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Apps) {
			// Create a sample Monkey object
			var sampleAppPostData = new Apps({
				name: 'New App',
				description: 'New App Description'
			});

			// Create a sample Category response
			var sampleCategoryResponse = new Apps({
				_id: '525cf20451979dea2c000001',
				name: 'New App',
				description: 'New App Description'
			});

			// Fixture mock form input values
			scope.name = 'New App';
			scope.description = 'New App Description';

			// Set POST response
			$httpBackend.expectPOST('apps', sampleAppPostData).respond(sampleAppResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Category was created
			expect($location.path()).toBe('/apps/' + sampleAppResponse._id);
		}));

		it('$scope.update() should update a valid App', inject(function(Apps) {
			// Define a sample Category put data
			var sampleAppPutData = new Apps({
				_id: '525cf20451979dea2c000001',
				name: 'Update App',
				description: 'Update App Description'
			});

			// Mock Category in scope
			scope.category = sampleAppPutData;

			// Set PUT response
			$httpBackend.expectPUT(/apps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/apps/' + sampleAppPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid appId and remove the Monkey from the scope', inject(function(Apps) {
			// Create new Category object
			var sampleApp = new Apps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Categorys array and include the Category
			scope.apps = [sampleApp];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/apps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleApp);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.apps.length).toBe(0);
		}));
	});
}());
