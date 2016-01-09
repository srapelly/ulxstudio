'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  //Topic = mongoose.model('Topic'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a topic
 */
exports.create = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Topic = academicdb.model('Topic');
  var topic = new Topic(req.body);
  topic.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * Show the current topics
 */
exports.read = function (req, res) {
  res.json(req.topic);
};

/**
 * Update a topic
 */
exports.update = function (req, res) {
  var topic = req.topic;

  topic.name = req.body.name;
  topic.code = req.body.code;

  topic.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * Delete an topic
 */
exports.delete = function (req, res) {
  var topic = req.topic;

  topic.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * List of Topics
 */
exports.list = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Topic = academicdb.model('Topic');
  Topic.find().sort('-created').exec(function (err, topics) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topics);
    }
  });
};

/**
 * Topucs by selected grade and subject
 */
exports.topicsByGradeSubjectID = function (req, res) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Topic = academicdb.model('Topic');
  Topic.find({gradeId: req.body.gradeId, subjectId: req.body.subjectId}).sort('-created').exec(function (err, topics) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topics);
    }
  });
};

/**
 * Topic middleware
 */
exports.topicByID = function (req, res, next, id) {
  var academicdb = require(path.resolve('./modules/core/connections/mongoose_academics'))(req.app.get('academic_db')),
      Topic = academicdb.model('Topic');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Topic is invalid'
    });
  }
  console.log('get topic by id');
  Topic.findById(id).populate('gradeId').populate('subjectId').exec(function (err, topic) {
    if (err) {
      return next(err);
    } else if (!topic) {
      return res.status(404).send({
        message: 'No topic with that identifier has been found'
      });
    }
    req.topic = topic;
    next();
  });
};
