'use strict';

// Configuring the Skills module
angular.module('assessments').run(['Menus',
  function (Menus) {
    // Add the skills dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Assessments',
      state: 'assessments',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'assessments', {
      title: 'List Assessments',
      state: 'assessments.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'assessments', {
      title: 'Create Assessments',
      state: 'assessments.create',
      roles: ['admin']
    });
  }
]);
