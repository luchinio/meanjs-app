'use strict';

(function() {
	// Billings Controller Spec
	describe('Billings Controller Tests', function() {
		// Initialize global variables
		var BillingsController,
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

			// Initialize the Billings controller.
			BillingsController = $controller('BillingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Billing object fetched from XHR', inject(function(Billings) {
			// Create sample Billing using the Billings service
			var sampleBilling = new Billings({
				name: 'New Billing'
			});

			// Create a sample Billings array that includes the new Billing
			var sampleBillings = [sampleBilling];

			// Set GET response
			$httpBackend.expectGET('billings').respond(sampleBillings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.billings).toEqualData(sampleBillings);
		}));

		it('$scope.findOne() should create an array with one Billing object fetched from XHR using a billingId URL parameter', inject(function(Billings) {
			// Define a sample Billing object
			var sampleBilling = new Billings({
				name: 'New Billing'
			});

			// Set the URL parameter
			$stateParams.billingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/billings\/([0-9a-fA-F]{24})$/).respond(sampleBilling);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.billing).toEqualData(sampleBilling);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Billings) {
			// Create a sample Billing object
			var sampleBillingPostData = new Billings({
				name: 'New Billing'
			});

			// Create a sample Billing response
			var sampleBillingResponse = new Billings({
				_id: '525cf20451979dea2c000001',
				name: 'New Billing'
			});

			// Fixture mock form input values
			scope.name = 'New Billing';

			// Set POST response
			$httpBackend.expectPOST('billings', sampleBillingPostData).respond(sampleBillingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Billing was created
			expect($location.path()).toBe('/billings/' + sampleBillingResponse._id);
		}));

		it('$scope.update() should update a valid Billing', inject(function(Billings) {
			// Define a sample Billing put data
			var sampleBillingPutData = new Billings({
				_id: '525cf20451979dea2c000001',
				name: 'New Billing'
			});

			// Mock Billing in scope
			scope.billing = sampleBillingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/billings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/billings/' + sampleBillingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid billingId and remove the Billing from the scope', inject(function(Billings) {
			// Create new Billing object
			var sampleBilling = new Billings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Billings array and include the Billing
			scope.billings = [sampleBilling];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/billings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBilling);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.billings.length).toBe(0);
		}));
	});
}());