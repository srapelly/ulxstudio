'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$http',
  function ($scope, $state, Authentication, Menus, $http) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    $scope.academics = [];
    $scope.selectedAcademic = "CBSE";

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    $scope.academics =

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.init = function() {
      $http({
        url: '/api/academics',
        method: "GET"
      }).success(function(response){
        $scope.academics = response;
        $scope.academicId = $scope.academics[0]._id;
        $scope.selectedAcademic = $scope.academics[0].name;
      });
    };

    $scope.selectAcademic = function(academic) {
      $scope.selectedAcademic = academic.name;
      $http({
        url: '/api/academics',
        method: "PUT",
        data: {
          name: $scope.selectedAcademic
        }
    }).success(function(response) {
      });
    };
  }
]);
