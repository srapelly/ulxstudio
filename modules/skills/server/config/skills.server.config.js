'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Module init function.
 */
module.exports = function (app, db) {
    console.log('at skills server config');
    console.log(app.locals.academic);
};
