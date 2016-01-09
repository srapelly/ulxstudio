'use strict';

/**
 * Module dependencies.
 */
var templatesPolicy = require('../policies/templates.server.policy'),
    templates = require('../controllers/templates.server.controller');

module.exports = function (app) {

  // templates collection routes
  app.route('/api/templates').all(templatesPolicy.isAllowed)
    .get(templates.list)
    .post(templates.create);

  // Single templates routes
  app.route('/api/templates/:templateId').all(templatesPolicy.isAllowed)
    .get(templates.read)
    .put(templates.update)
    .delete(templates.delete);

  // Finish by binding the article middleware
  app.param('templateId', templates.templateByID);
};
