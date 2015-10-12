'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Rave Schema
 */
var RaveSchema = new Schema({
	app: { 
		type: Schema.Types.ObjectId,
		ref: 'App'
		//, required: 'invalid app' // TODO: make tests pass valid category
	},
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true, 	
		required: 'name cannot be blank',
		validate: [validation.len(40), 'name must be 40 chars in length or less']
	},
	about: {
		type: String,
		default: '',
		trim: true, 	
		required: 'about cannot be blank',
		validate: [validation.len(40), 'What are you raving must be 40 chars in length or less']
	},
	whyUse: {
		type: String,
		default: '',
		trim: true, 	
		required: 'whyUse cannot be blank',
		validate: [validation.len(75), 'Why must be 75 chars in length or less']
	},
	problem: {
		type: String,
		default: '',
		trim: true, 	
		required: 'name cannot be blank',
		validate: [validation.len(130), 'Why must be 130 chars in length or less']
	},
	howLong: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(75), 'Why must be 30 chars in length or less']
	},
	howUse: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(180), 'How use 180 chars in length or less']
	},
	whyShould: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(170), ' must be 170 chars in length or less']
	},
	drawbacks: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(170), ' must be 170 chars in length or less']
	},
	howSolve: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(130), ' must be 130 chars in length or less']
	},
	favorite: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(120), ' must be 120 chars in length or less']
	},
	fans: {
		type: String,
		default: '',
		trim: true, 	
		required: '  cannot be blank',
		validate: [validation.len(185), ' must be 185 chars in length or less']
	}




});

mongoose.model('Rave', RaveSchema);
