'use strict';

// Configuring the Articles module
angular.module('billings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Billings', 'billings', 'dropdown', '/billings(/create)?');
		Menus.addSubMenuItem('topbar', 'billings', 'List Billings', 'billings');
		Menus.addSubMenuItem('topbar', 'billings', 'New Billing', 'billings/create');
	}
]);
