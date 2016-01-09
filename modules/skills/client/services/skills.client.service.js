'use strict';

//Skills service used for communicating with the articles REST endpoints
angular.module('topics').factory('Skills', ['$resource',
  function ($resource) {
    return $resource('api/skills/:skillId', {
      skillId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
