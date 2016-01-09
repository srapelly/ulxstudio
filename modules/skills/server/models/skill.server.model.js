'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Topics Schema
 */
/**
 * Topics Schema
 */
var TopicSkillSchema = new Schema({
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
  index: {
    type: Number,
    required: 'Index cannot be blank'
  },
  seoLink: {
    type: String,
    default: ''
  },
  topicId: {
    type: Schema.ObjectId,
    ref: 'Topic'
  },
  state: {
    type: [{
      type: String,
      enum: ["draft", "review", "approved", "rejected"]
    }],
    default: 'draft',
    required: 'state cannot be blank'
  },
  gradeSubjectCode: {
    type: String,
    default: ''
  },
  assessmentsRef: {
    type: String,
    required: 'assessment reference cannot be blank'
  }
});

module.exports = TopicSkillSchema;
//mongoose.model('Skill', SkillSchema);
