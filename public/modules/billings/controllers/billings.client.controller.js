'use strict';

// Billings controller
angular.module('billings').controller('BillingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Billings',
	function($scope, $stateParams, $location, Authentication, Billings ) {
		$scope.authentication = Authentication;

		// Create new Billing
		$scope.create = function() {
			// Create new Billing object
			var billing = new Billings ({
				name: this.name
			});

			// Redirect after save
			billing.$save(function(response) {
				$location.path('billings/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Billing
		$scope.remove = function( billing ) {
			if ( billing ) { billing.$remove();

				for (var i in $scope.billings ) {
					if ($scope.billings [i] === billing ) {
						$scope.billings.splice(i, 1);
					}
				}
			} else {
				$scope.billing.$remove(function() {
					$location.path('billings');
				});
			}
		};

		// Update existing Billing
		$scope.update = function() {
			var billing = $scope.billing ;

			billing.$update(function() {
				$location.path('billings/' + billing._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Billings
		$scope.find = function() {
			$scope.billings = Billings.query();
		};

		// Find existing Billing
		$scope.findOne = function() {
			$scope.billing = Billings.get({ 
				billingId: $stateParams.billingId
			});
		};
	}
]);