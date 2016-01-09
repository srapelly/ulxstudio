'use strict';

// Grades controller
angular.module('grades').controller('GradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Grades', '$http',
  function ($scope, $stateParams, $location, Authentication, Grades, $http) {
    $scope.authentication = Authentication;
    $scope.academicId = null;
    $scope.academics = [];
    $scope.selectedAcademic = "Select Academic";
    // Create new Grades
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'gradeForm');

        return false;
      }

      // Create new Grades object
      var grade = new Grades({
        name: this.name,
        code: this.code,
        standard: this.standard,
        academicId: $scope.academicId
      });

      // Redirect after save
      grade.$save(function (response) {
        $location.path('grades/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.code = '';
        $scope.standard = '';
        $scope.selectAcademic = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Grades
    $scope.remove = function (grade) {
      if (grade) {
        grade.$remove();

        for (var i in $scope.grades) {
          if ($scope.grades[i] === grade) {
            $scope.grades.splice(i, 1);
          }
        }
      } else {
        $scope.grade.$remove(function () {
          $location.path('grades');
        });
      }
    };

    // Update existing Grades
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'gradeForm');

        return false;
      }

      var grade = $scope.grade;

      grade.$update(function () {
        $location.path('grades/' + grade._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.init = function() {
      $http({
        url: '/api/academics',
        method: "GET"
      }).success(function(response){
        $scope.academics = response;
        if ($scope.grade && $scope.grade.$resolved) {
          $scope.academicId = $scope.grade.academicId;
          $scope.selectedAcademic = $scope.grade.academicId.name;
        } else {
          $scope.academicId = $scope.academics[0]._id;
          $scope.selectedAcademic = $scope.academics[0].name;
        }
      });
    };
    $scope.selectAcademic = function(academic) {
      $scope.academicId = academic._id;
      $scope.selectedAcademic = academic.name;
    };
    // Find a list of Grades
    $scope.find = function () {
      $scope.grades = Grades.query();
    };

    // Find existing Grades
    $scope.findOne = function () {
      $scope.grade = Grades.get({
        gradeId: $stateParams.gradeId
      });
      $scope.init();
    };
  }
]);
