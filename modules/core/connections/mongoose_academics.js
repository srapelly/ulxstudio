'use strict';

/**
 * Module dependencies.
 */
var chalk = require('chalk'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    mongoose_academics = require('mongoose'),
    academicdb,
    academicName;

module.exports = function(academic) {
    academic = academic || 'cbse';
    console.log("entered into mongoose academics" + academic || 'cbse');
    academicdb = mongoose_academics.createConnection('mongodb://localhost/ulxstudio-' +academic);

    academicdb.on('error', function (err) {
        if (err) throw err;
    });

    academicdb.once('open', function callback() {
        console.info('Mongo db connected successfully');
    });

    return academicdb;
};
//module.exports = academicdb;
