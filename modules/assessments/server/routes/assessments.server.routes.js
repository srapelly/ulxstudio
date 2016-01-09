'use strict';

/**
 * Module dependencies.
 */
var assessmentsPolicy = require('../policies/assessments.server.policy'),
    assessments = require('../controllers/assessments.server.controller');

module.exports = function (app) {

  // assessments collection routes
  app.route('/api/assessments').all(assessmentsPolicy.isAllowed)
    .get(assessments.list)
    .post(assessments.create);

  // Single assessments routes
  app.route('/api/skills/:skillId').all(assessmentsPolicy.isAllowed)
    .get(assessments.read)
    .put(assessments.update)
    .delete(assessments.delete);

  app.route('/api/assessmentsbyskill').all(assessmentsPolicy.isAllowed)
      .post(assessments.assessmentsBySkillId);


  // Finish by binding the article middleware
  app.param('assessmentId', assessments.assessmentByID);
};
