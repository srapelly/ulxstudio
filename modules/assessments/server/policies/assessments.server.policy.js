'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke assessment Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/assessments',
      permissions: '*'
    }, {
      resources: '/api/assessments/:assessmentId',
      permissions: '*'
    },
      {
        resources: '/api/assessmentsbyskill',
        permissions: '*'
      }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/assessments',
      permissions: ['get', 'post']
    }, {
      resources: '/api/assessments/:assessmentId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Skills Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['admin'];

  // If an article is being processed and the current user created it then allow any manipulation
  if (req.assessment && req.user) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
