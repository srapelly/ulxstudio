'use strict';

/**
 * Module dependencies.
 */
var topicsPolicy = require('../policies/topics.server.policy'),
  topics = require('../controllers/topics.server.controller');

module.exports = function (app) {
  // Topics collection routes
  app.route('/api/topics').all(topicsPolicy.isAllowed)
    .get(topics.list)
    .post(topics.create);

  // Single topic routes
  app.route('/api/topics/:topicId').all(topicsPolicy.isAllowed)
    .get(topics.read)
    .put(topics.update)
    .delete(topics.delete);

  app.route('/api/topicsbygradesubject').all(topicsPolicy.isAllowed)
      .post(topics.topicsByGradeSubjectID);
  // Finish by binding the article middleware
  app.param('topicId', topics.topicByID);
};
