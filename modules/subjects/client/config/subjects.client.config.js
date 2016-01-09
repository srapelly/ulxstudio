'use strict';

// Configuring the Subjects module
angular.module('subjects').run(['Menus',
  function (Menus) {
    // Add the subjects dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Subjects',
      state: 'subjects',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'subjects', {
      title: 'List Subjects',
      state: 'subjects.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'subjects', {
      title: 'Create Subjects',
      state: 'subjects.create',
      roles: ['admin']
    });
  }
]);
