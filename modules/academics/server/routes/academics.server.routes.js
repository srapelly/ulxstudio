'use strict';

/**
 * Module dependencies.
 */
var academics = require('../controllers/academics.server.controller');
var path = require('path');

module.exports = function (app) {
    // Academics collection routes
    app.route('/api/academics')
    .post(academics.create)
    .get(academics.list)
    .put(function (req, res) {
        req.app.set('academic_db', req.body.name);
    });
};
