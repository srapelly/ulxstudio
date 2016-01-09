'use strict';

//Templates service used for communicating with the articles REST endpoints
angular.module('templates').factory('Templates', ['$resource',
  function ($resource) {
    return $resource('api/templates/:templateId', {
      skillId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
