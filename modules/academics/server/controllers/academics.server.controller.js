'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Academic = mongoose.model('Academic'),
    academicsData = require('../../academics.json'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    academicItem = {},
    exists = false;

exports.findCb = function(err, items) {
    console.log('error is ' + err);
    console.log(items.length);
    if (items !== null && items.length > 0) {
        exists = true;
    } else {
        new Academic(academicItem).save();
    }
};
/**
 * Create  academics if not exists
 */
exports.create = function (req, res) {
    console.log('database used' + req.app.get('academic_db'));
    // populate the academics collection from json data
    Academic.find().exec(function(err, items){
        if (!err) {
            for (var i = 0; i < academicsData.length; i++) {
                exists = false;
                academicItem = academicsData[i];
                var value = academicsData[i].name;

                if (items.length > 0) {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].name === value) {
                            exists = true;
                        }
                    }
                }
                if (!exists) {
                    new Academic(academicItem).save();
                }
            }
        }
    });

};

exports.list = function (req, res) {

    Academic.find().sort('-name').exec(function (err, academics) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(academics);
        }
    });

};
