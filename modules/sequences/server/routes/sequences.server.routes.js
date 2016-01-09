'use strict';

/**
 * Module dependencies.
 */
var sequences = require('../controllers/sequences.server.controller');
var path = require('path');

module.exports = function (app) {
    // sequences collection routes
    app.route('/api/sequences/:sequenceName').get(sequences.read);

    // Finish by binding the sequence middleware
    app.param('sequenceName', sequences.getSequence);
};
