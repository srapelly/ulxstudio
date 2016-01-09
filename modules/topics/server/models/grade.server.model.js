'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Topics Schema
 */
var TopicSchema = new Schema({
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
  gradeId: {
    type: Schema.ObjectId,
    ref: 'Grade'
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject'
  }
});

mongoose.model('Topic', TopicSchema);
