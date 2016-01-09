'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AcademicSchema = new Schema({
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    code: {
        type: String,
        required: 'Code cannot be blank'
    }
});

mongoose.model('Academic', AcademicSchema);
