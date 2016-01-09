'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AssessmentSchema = require('../models/assessment.server.model'),
    Assessment;

/**
 * Create a assessments
 */
exports.create = function (req, res) {
  var model = 'grade1_math_skill_'+ req.body.skillIndex + '_assessment';
  mongoose.model(model,AssessmentSchema);

  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Assessment = academicdb.model(model);

  var assessment = new Assessment(req.body);

  assessment.save(function (err) {
    console.log('in save function...');
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(assessment);
    }
  });
};

/**
 * Show the current assessments
 */
exports.read = function (req, res) {
  res.json(req.assessment);
};

/**
 * Update a assessments
 */
exports.update = function (req, res) {
  var assessment = req.assessment;

  assessment.name = req.body.name;
  assessment.code = req.body.code;

  assessment.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(assessment);
    }
  });
};

/**
 * Delete an assessments
 */
exports.delete = function (req, res) {
  var assessment = req.assessment;

  assessment.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(assessment);
    }
  });
};

/**
 * List of assessments by Topic Id
 */
exports.assessmentsBySkillId = function(req, res) {
  var model = 'grade1_math_skill';
  mongoose.model(model, AssessmentSchema);
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Skill = academicdb.model(model);
  Skill.find({skillId: req.body.topicId}).sort('-index').exec(function (err, assessments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(assessments);
    }
  });
};
/**
 * List of assessments
 */
exports.list = function (req, res) {
};

/**
 * assessments middleware
 */
exports.assessmentByID = function (req, res, next, id) {
  var model = 'grade1_math_skill';

  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Assessment = academicdb.model(model);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Asessment is invalid'
    });
  }
  Assessment.findById(id).populate('skillId').exec(function (err, assessment) {
    if (err) {
      return next(err);
    } else if (!assessment) {
      return res.status(404).send({
        message: 'No assessment with that identifier has been found'
      });
    }
    req.assessment = assessment;
    next();
  });
};
