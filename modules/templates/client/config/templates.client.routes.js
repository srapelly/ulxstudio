'use strict';

// Setting up route
angular.module('templates').config(['$stateProvider',
  function ($stateProvider) {
    // template state routing
    $stateProvider
      .state('templates', {
        abstract: true,
        url: '/templates',
        template: '<ui-view/>'
      })
      .state('templates.list', {
        url: '',
        templateUrl: 'modules/templates/client/views/list-template.client.view.html'
      })
      .state('templates.create', {
        url: '/create',
        templateUrl: 'modules/templates/client/views/create-template.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('templates.view', {
        url: '/:templateId',
        templateUrl: 'modules/templates/client/views/view-template.client.view.html'
      })
      .state('templates.edit', {
        url: '/:templateId/edit',
        templateUrl: 'modules/templates/client/views/edit-template.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
