'use strict';

// Setting up route
angular.module('skills').config(['$stateProvider',
  function ($stateProvider) {
    // Skills state routing
    $stateProvider
      .state('skills', {
        abstract: true,
        url: '/skills',
        template: '<ui-view/>'
      })
      .state('skills.list', {
        url: '',
        templateUrl: 'modules/skills/client/views/list-skill.client.view.html'
      })
      .state('skills.create', {
        url: '/create',
        templateUrl: 'modules/skills/client/views/create-skill.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('skills.view', {
        url: '/:skillId',
        templateUrl: 'modules/skills/client/views/view-skill.client.view.html'
      })
      .state('skills.edit', {
        url: '/:skillId/edit',
        templateUrl: 'modules/skills/client/views/edit-skill.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
