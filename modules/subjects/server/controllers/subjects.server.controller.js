'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  //Subject = mongoose.model('Subject'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a subject
 */
exports.create = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Subject = academicdb.model('Subject');
  var subject = new Subject(req.body);
  subject.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subject);
    }
  });
};

/**
 * Show the current subjects
 */
exports.read = function (req, res) {
  res.json(req.subject);
};

/**
 * Update a subject
 */
exports.update = function (req, res) {
  var subject = req.subject;

  subject.name = req.body.name;
  subject.code = req.body.code;
  subject.syllabus = req.body.syllabus;

  subject.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subject);
    }
  });
};

/**
 * Delete an subject
 */
exports.delete = function (req, res) {
  var subject = req.subject;

  subject.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subject);
    }
  });
};

/**
 * List of Subjects
 */
exports.list = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Subject = academicdb.model('Subject');
  Subject.find().sort('-name').exec(function (err, subjects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(subjects);
    }
  });
};

/**
 * Subject middleware
 */
exports.subjectByID = function (req, res, next, id) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Subject = academicdb.model('Subject');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Subject is invalid'
    });
  }

  Subject.findById(id).exec(function (err, subject) {
    if (err) {
      return next(err);
    } else if (!subject) {
      return res.status(404).send({
        message: 'No subject with that identifier has been found'
      });
    }
    req.subject = subject;
    next();
  });
};
