'use strict';

//Setting up route
angular.module('billings').config(['$stateProvider',
	function($stateProvider) {
		// Billings state routing
		$stateProvider.
		state('listBillings', {
			url: '/billings',
			templateUrl: 'modules/billings/views/list-billings.client.view.html'
		}).
		state('createBilling', {
			url: '/billings/create',
			templateUrl: 'modules/billings/views/create-billing.client.view.html'
		}).
		state('viewBilling', {
			url: '/billings/:billingId',
			templateUrl: 'modules/billings/views/view-billing.client.view.html'
		}).
		state('editBilling', {
			url: '/billings/:billingId/edit',
			templateUrl: 'modules/billings/views/edit-billing.client.view.html'
		});
	}
]);