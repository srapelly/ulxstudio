'use strict';

// Topics controller
angular.module('topics').controller('TopicsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Topics', '$http',
  function ($scope, $stateParams, $location, Authentication, Topics, $http) {
    $scope.authentication = Authentication;
    // Create new Topics
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'topicForm');

        return false;
      }

      // Create new Topics object
      var topic = new Topics({
        name: this.name,
        code: $scope.gradeCode + '_' + $scope.subjectCode,
        gradeId: $scope.gradeId,
        subjectId: $scope.subjectId
      });

      // Redirect after save
      topic.$save(function (response) {
        $location.path('topics/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.code = '';
        $scope.selectAcademic = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Topics
    $scope.remove = function (topic) {
      if (topic) {
        topic.$remove();

        for (var i in $scope.topics) {
          if ($scope.topics[i] === topic) {
            $scope.topics.splice(i, 1);
          }
        }
      } else {
        $scope.topic.$remove(function () {
          $location.path('topics');
        });
      }
    };

    // Update existing Topics
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'topicForm');

        return false;
      }

      var topic = $scope.topic;

      topic.$update(function () {
        $location.path('topics/' + topic._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.init = function() {
      $http({
        url: '/api/grades',
        method: "GET"
      }).success(function(response){
        $scope.grades = response;
        if ($scope.topic && $scope.topic.$resolved) {
          $scope.gradeId = $scope.topic.gradeId;
          $scope.selectedGrade = $scope.topic.gradeId.name;
          $scope.gradeCode = $scope.topic.gradeId.code;
        } else {
          $scope.gradeId = $scope.grades[0]._id;
          $scope.selectedGrade = $scope.grades[0].name;
          $scope.gradeCode = $scope.grades[0].code;
        }
      });

      $http({
        url: '/api/subjects',
        method: "GET"
      }).success(function(response){
        $scope.subjects = response;
        if ($scope.topic && $scope.topic.$resolved) {
          $scope.subjectId = $scope.topic.subjectId;
          $scope.selectedSubject = $scope.topic.subjectId.name;
          $scope.subjectCode = $scope.topic.subjectId.code;
        } else {
          $scope.subjectId = $scope.subjects[0]._id;
          $scope.selectedSubject = $scope.subjects[0].name;
          $scope.subjectCode = $scope.subjects[0].code;
        }
      });
    };

    $scope.selectGrade = function(grade) {
      $scope.gradeId = grade._id;
      $scope.selectedGrade = grade.name;
      $scope.gradeCode = grade.code;
    };

    $scope.topicCode = function () {
      return $scope.gradeCode + $scope.subjectCode;
    };

    $scope.selectSubject = function(subject) {
      $scope.subjectId = subject._id;
      $scope.selectedSubject = subject.name;
      $scope.subjectCode = subject.code;
    };
    // Find a list of Topics
    $scope.find = function () {
      $scope.topics = Topics.query();
    };

    // Find existing Topics
    $scope.findOne = function () {
      $scope.topic = Topics.get({
        topicId: $stateParams.topicId
      });
      $scope.init();
    };
  }
]);
