'use strict';

//Topics service used for communicating with the articles REST endpoints
angular.module('topics').factory('Topics', ['$resource',
  function ($resource) {
    return $resource('api/topics/:topicId', {
      topicId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
