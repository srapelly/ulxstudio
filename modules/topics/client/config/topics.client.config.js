'use strict';

// Configuring the Topics module
angular.module('topics').run(['Menus',
  function (Menus) {
    // Add the topics dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Topics',
      state: 'topics',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'topics', {
      title: 'List Topics',
      state: 'topics.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'topics', {
      title: 'Create Topics',
      state: 'topics.create',
      roles: ['admin']
    });
  }
]);
