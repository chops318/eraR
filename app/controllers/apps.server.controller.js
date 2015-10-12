'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  App = mongoose.model('App'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('App', 'name');

module.exports = crud;
