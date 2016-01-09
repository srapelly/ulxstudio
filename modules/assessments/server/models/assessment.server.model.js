'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Topics Schema
 */

  var AssessmentSchema = new Schema({
    name: {
      type: String,
      default: '',
      trim: true,
      required: 'Name cannot be blank'
    },
    body: {
      type: String,
      default: '',
      trim: true,
      required: 'Code cannot be blank'
    },
    level: {
      type: Number,
      default: 100,
      required: 'Index cannot be blank'
    },
    questionTemplateId: {
      type: Schema.ObjectId,
      ref: 'Template'
    },
    answerTemplateId: {
      type: Schema.ObjectId,
      ref: 'Template'
    },
    skillId: {
      type: Schema.ObjectId,
      ref: 'Skill'
    },
    answers: {
      type: [{
        type: String
      }],
      required: 'Please provide at least one answers'
    },
  });

module.exports = AssessmentSchema;

