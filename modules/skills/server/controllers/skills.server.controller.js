'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    TopicSkillSchema = require('../models/skill.server.model'),
    SequenceSchema = require(path.resolve('./modules/sequences/server/models/sequence.server.model')),
    Sequence = null,
    sequenceId = null,
    Skill;


TopicSkillSchema.pre('save', function(next){
  var doc = this;
  Sequence.findByIdAndUpdate( sequenceId, { $inc: { nextSeqNumber: 1 } }, function (err, settings) {
    if (err) next(err);
    next();
  });
});

/**
 * Create a skill
 */
exports.create = function (req, res) {
  var model = req.body.gradeSubjectCode + '_skill',
      academic_db = req.app.get('academic_db');

  mongoose.model(model, TopicSkillSchema);

  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(academic_db),
     Skill = academicdb.model(model);

  Sequence = academicdb.model(model + '_seq');

  var skill = new Skill(req.body);
  sequenceId = req.body.sequenceId;
  console.log('sequence number' + sequenceId);


  skill.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * Show the current skills
 */
exports.read = function (req, res) {
  res.json(req.skill);
};

/**
 * Update a skill
 */
exports.update = function (req, res) {
  var skill = req.skill;

  skill.name = req.body.name;
  skill.code = req.body.code;

  skill.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * Delete an skill
 */
exports.delete = function (req, res) {
  var skill = req.skill;

  skill.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skill);
    }
  });
};

/**
 * List of skills by Topic Id
 */
exports.skillsByTopicId = function(req, res) {
  var model = req.body.gradeSubjectCode + '_skill';
  mongoose.model(model, TopicSkillSchema);
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Skill = academicdb.model(model);
  Skill.find({topicId: req.body.topicId}).sort('-index').exec(function (err, skills) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skills);
    }
  });
};
/**
 * List of Skills
 */
exports.list = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Skill = academicdb.model('Skill');
  Skill.find().sort('-created').exec(function (err, skills) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(skills);
    }
  });
};

/**
 * Skill middleware
 */
exports.skillByID = function (req, res, next, id) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Skill = academicdb.model('Skill');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Skill is invalid'
    });
  }
  console.log('get skill by id');
  Skill.findById(id).populate('gradeId').populate('subjectId').exec(function (err, skill) {
    if (err) {
      return next(err);
    } else if (!skill) {
      return res.status(404).send({
        message: 'No skill with that identifier has been found'
      });
    }
    req.skill = skill;
    next();
  });
};
