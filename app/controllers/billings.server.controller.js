'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Billing = mongoose.model('Billing'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Billing already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Billing
 */
exports.create = function(req, res) {
	var billing = new Billing(req.body);
	billing.user = req.user;

	billing.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(billing);
		}
	});
};

/**
 * Show the current Billing
 */
exports.read = function(req, res) {
	res.jsonp(req.billing);
};

/**
 * Update a Billing
 */
exports.update = function(req, res) {
	var billing = req.billing ;

	billing = _.extend(billing , req.body);

	billing.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(billing);
		}
	});
};

/**
 * Delete an Billing
 */
exports.delete = function(req, res) {
	var billing = req.billing ;

	billing.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(billing);
		}
	});
};

/**
 * List of Billings
 */
exports.list = function(req, res) { Billing.find().sort('-created').populate('user', 'displayName').exec(function(err, billings) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(billings);
		}
	});
};

/**
 * Billing middleware
 */
exports.billingByID = function(req, res, next, id) { Billing.findById(id).populate('user', 'displayName').exec(function(err, billing) {
		if (err) return next(err);
		if (! billing) return next(new Error('Failed to load Billing ' + id));
		req.billing = billing ;
		next();
	});
};

/**
 * Billing authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.billing.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};