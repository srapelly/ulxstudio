'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Templates Schema
 */
var TemplateSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  template: {
    type: String,
    default: '',
    trim: false,
    required: 'Template cannot be blank'
  },
  templateType: {
    type: String,
    default: 'Question',
    trim: false,
    required: 'Template type cannot be blank'
  }
});

mongoose.model('Template', TemplateSchema);
