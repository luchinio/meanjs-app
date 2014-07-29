'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var billings = require('../../app/controllers/billings');

	// Billings Routes
	app.route('/billings')
		.get(billings.list)
		.post(users.requiresLogin, billings.create);

	app.route('/billings/:billingId')
		.get(billings.read)
		.put(users.requiresLogin, billings.hasAuthorization, billings.update)
		.delete(users.requiresLogin, billings.hasAuthorization, billings.delete);

	// Finish by binding the Billing middleware
	app.param('billingId', billings.billingByID);
};