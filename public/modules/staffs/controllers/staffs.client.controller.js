'use strict';

// Staffs controller
angular.module('staffs').controller('StaffsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Staffs',
	function($scope, $stateParams, $location, Authentication, Staffs ) {
		$scope.authentication = Authentication;

		// Create new Staff
		$scope.create = function() {
			// Create new Staff object
			var staff = new Staffs ({
				name: this.name
			});

			// Redirect after save
			staff.$save(function(response) {
				$location.path('staffs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Staff
		$scope.remove = function( staff ) {
			if ( staff ) { staff.$remove();

				for (var i in $scope.staffs ) {
					if ($scope.staffs [i] === staff ) {
						$scope.staffs.splice(i, 1);
					}
				}
			} else {
				$scope.staff.$remove(function() {
					$location.path('staffs');
				});
			}
		};

		// Update existing Staff
		$scope.update = function() {
			var staff = $scope.staff ;

			staff.$update(function() {
				$location.path('staffs/' + staff._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Staffs
		$scope.find = function() {
			$scope.staffs = Staffs.query();
		};

		// Find existing Staff
		$scope.findOne = function() {
			$scope.staff = Staffs.get({ 
				staffId: $stateParams.staffId
			});
		};
	}
]);