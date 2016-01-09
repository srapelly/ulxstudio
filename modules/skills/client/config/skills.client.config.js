'use strict';

// Configuring the Skills module
angular.module('skills').run(['Menus',
  function (Menus) {
    // Add the skills dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Skills',
      state: 'skills',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'skills', {
      title: 'List Skills',
      state: 'skills.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'skills', {
      title: 'Create Skills',
      state: 'skills.create',
      roles: ['admin']
    });
  }
]);
