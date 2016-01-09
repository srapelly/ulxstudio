'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Grades Schema
 */
var GradeSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  code: {
    type: String,
    default: '',
    trim: true,
    required: 'Code cannot be blank'
  },
  standard: {
    type: Number,
    default: 0,
    required: 'Code cannot be blank'
  },
  academicId: {
    type: Schema.ObjectId,
    ref: 'Academic'
  }
});

mongoose.model('Grade', GradeSchema);
