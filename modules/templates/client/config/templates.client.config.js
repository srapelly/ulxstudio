'use strict';

// Configuring the Skills module
angular.module('templates').run(['Menus',
  function (Menus) {
    // Add the skills dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Templates',
      state: 'templates',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'templates', {
      title: 'List templates',
      state: 'templates.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'templates', {
      title: 'Create Template',
      state: 'templates.create',
      roles: ['admin']
    });
  }
]);
