'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Supplier Schema
 */
var SupplierSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Supplier name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Supplier', SupplierSchema);