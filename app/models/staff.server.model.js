'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Staff Schema
 */
var StaffSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
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

mongoose.model('Staff', StaffSchema);