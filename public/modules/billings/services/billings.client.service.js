'use strict';

//Billings service used to communicate Billings REST endpoints
angular.module('billings').factory('Billings', ['$resource',
	function($resource) {
		return $resource('billings/:billingId', { billingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);