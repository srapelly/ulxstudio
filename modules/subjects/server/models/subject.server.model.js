'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Subjects Schema
 */
var SubjectSchema = new Schema({
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
  syllabus: {
    type: String,
    default: '',
    required: 'Syllabus cannot be blank'
  }
});

mongoose.model('Subject', SubjectSchema);
