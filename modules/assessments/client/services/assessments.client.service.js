'use strict';

//Skills service used for communicating with the articles REST endpoints
angular.module('assessments').factory('Assessments', ['$resource',
  function ($resource) {
    return $resource('api/assessments/:assessmentsId', {
      skillId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
