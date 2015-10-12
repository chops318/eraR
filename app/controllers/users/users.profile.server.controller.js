'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),

    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');
/*
 * Export list of users
 */
exports.list = function(req, res, sortBy) {

    var user = user;

    console.log(user);
    User.find().sort('-created').exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            //
            res.json(users);
        }
    });
};
/**
 * Update user details
 */
exports.update = function(req, res) {
    // Init Variables
    var user = req.user;
    var message = null;

    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    if (user) {
        // Merge existing user
        user = _.extend(user, req.body);
        user.updated = Date.now();
        user.displayName = user.firstName + ' ' + user.lastName;

        user.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.json(req.user || null);
};

/* Get user by Id */

exports.getByID = function(req, res, next, id) {
    var user = user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: user + ' is invalid'
        });
    }

    User.findById(id).exec(function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.status(404).send({
                message: user + ' not found'
            });
        }
        req.user = user;
        next();
    });
};
/* Individual user profile */
exports.read = function(req, res) {
	req.user = _.pick(req.user, 'username');
    res.json(req.user);
};