'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Template = mongoose.model('Template'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a template
 */
exports.create = function (req, res) {
  var template = new Template(req.body);
  template.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(template);
    }
  });
};

/**
 * Show the current templates
 */
exports.read = function (req, res) {
  res.json(req.template);
};

/**
 * Update a template
 */
exports.update = function (req, res) {
  var template = req.template;

  template.name = req.body.name;
  template.code = req.body.code;
  template.standard = req.body.standard;

  template.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(template);
    }
  });
};

/**
 * Delete an template
 */
exports.delete = function (req, res) {
  var template = req.template;

  template.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(template);
    }
  });
};

/**
 * List of Templates
 */
exports.list = function (req, res) {
  Template.find().sort('-created').exec(function (err, templates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(templates);
    }
  });
};

/**
 * Template middleware
 */
exports.templateByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Template is invalid'
    });
  }

  Template.findById(id).exec(function (err, template) {
    if (err) {
      return next(err);
    } else if (!template) {
      return res.status(404).send({
        message: 'No template with that identifier has been found'
      });
    }
    req.template = template;
    next();
  });
};
