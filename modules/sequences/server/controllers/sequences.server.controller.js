'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    SequenceSchema = require('../models/sequence.server.model');

/**
 * Show the current skills
 */
exports.read = function (req, res) {
    res.json(req.sequence);
};

exports.getSequence = function (req, res, next, sequenceName) {
    var model = sequenceName + '_seq',
        academic_db = req.app.get('academic_db');

    mongoose.model(model, SequenceSchema);

    var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(academic_db),
        Sequence = academicdb.model(model);

    var sequence = new Sequence({ nextSeqNumber: 1 });

    Sequence.find().sort('-created').exec(function (err, seqs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (seqs && seqs.length === 0) {
                sequence.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        req.sequence = sequence;
                        next();
                    }
                });
            } else {
                req.sequence = seqs[0];
                next();
            }
        }
    });
};