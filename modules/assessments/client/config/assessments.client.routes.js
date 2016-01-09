'use strict';

// Setting up route
angular.module('assessments').config(['$stateProvider',
  function ($stateProvider) {
    // assessment state routing
    $stateProvider
      .state('assessments', {
        abstract: true,
        url: '/assessments',
        template: '<ui-view/>'
      })
      .state('assessments.list', {
        url: '',
        templateUrl: 'modules/assessments/client/views/list-assessment.client.view.html'
      })
      .state('assessments.create', {
        url: '/create',
        templateUrl: 'modules/assessments/client/views/create-assessment.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('assessments.view', {
        url: '/:assessmentId',
        templateUrl: 'modules/assessments/client/views/view-assessment.client.view.html'
      })
      .state('assessments.edit', {
        url: '/:assessmentId/edit',
        templateUrl: 'modules/assessments/client/views/edit-assessment.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
