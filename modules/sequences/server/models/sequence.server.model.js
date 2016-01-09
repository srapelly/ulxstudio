'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SequenceSchema = new mongoose.Schema({
    nextSeqNumber: { type: Number, default: 1 }
});

module.exports = SequenceSchema;
