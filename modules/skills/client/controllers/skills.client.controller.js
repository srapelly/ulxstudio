'use strict';

// Skills controller
angular.module('skills').controller('SkillsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Skills', '$http',
  function ($scope, $stateParams, $location, Authentication, Skills, $http) {
    $scope.authentication = Authentication;
    $scope.currentGrade = null;
    $scope.currentSubject = null;
    $scope.currentTopic = null;
    $scope.selectedTopic = "Select Topic";
    $scope.skillSearch = '';
    // Create new Skills
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'skillForm');

        return false;
      }

      // Create new Skills object
      //assessmentsRef = grade_subject_topicindex_skillcode_skillindex
      var skill = new Skills({
        name: $scope.name,
        code: 'A',
        index: $scope.sequence.nextSeqNumber,
        seoLink: $scope.name.replace(" ", "_"),
        topicId: $scope.topicId,
        state: 'draft',
        gradeSubjectCode: $scope.skillCode(),
        assessmentsRef: 'first_math_',
        sequenceId: $scope.sequence._id
      });

      // Redirect after save
      skill.$save(function (response) {
        //$location.path('skills/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.refreshSeq();
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Skills
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

    // Update existing Skills
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
        if ($scope.skill && $scope.skill.$resolved) {
          $scope.gradeId = $scope.skill.gradeId;
          $scope.selectedGrade = $scope.skill.gradeId.name;
          $scope.gradeCode = $scope.skill.gradeId.code;
        } else {
          $scope.gradeId = $scope.grades[0]._id;
          $scope.selectedGrade = $scope.grades[0].name;
          $scope.gradeCode = $scope.grades[0].code;
          $scope.currentGrade = $scope.grades[0];
        }
      });

      $http({
        url: '/api/subjects',
        method: "GET"
      }).success(function(response){
        $scope.subjects = response;
        if ($scope.skill && $scope.skill.$resolved) {
          $scope.subjectId = $scope.skill.subjectId;
          $scope.selectedSubject = $scope.skill.subjectId.name;
          $scope.subjectCode = $scope.skill.subjectId.code;
        } else {
          $scope.selectedSubject = "Select Subject";
        }
      });

    };

    $scope.selectGrade = function(grade) {
      $scope.gradeId = grade._id;
      $scope.selectedGrade = grade.name;
      $scope.gradeCode = grade.code;
      $scope.currentGrade = grade;
    };

    $scope.skillCode = function () {
      var code = "";
      if ($scope.currentGrade && $scope.subjectCode) {
          code = 'grade' + $scope.currentGrade.standard + '_' + $scope.subjectCode || '';
      }
      return code;
    };

    $scope.selectSubject = function(subject) {
      $scope.subjectId = subject._id;
      $scope.selectedSubject = subject.name;
      $scope.subjectCode = subject.code;
      $scope.currentSubject = subject;

      $http({
        url: '/api/topicsbygradesubject',
        method: "POST",
        data: {
          gradeId: $scope.gradeId,
          subjectId: $scope.subjectId
        }
      }).success(function(response){
        $scope.topics = response;
        $scope.selectedTopic = "Select Topic";
      });
    };

    $scope.selectTopic = function(topic) {
      $scope.topicId = topic._id;
      $scope.selectedTopic = topic.name;
      $scope.currentTopic = topic;
      $scope.refreshSeq();
    };
    $scope.refreshSeq = function() {
      var sequenceName = $scope.skillCode() + "_skill";
      $http({
        url: '/api/sequences/' + sequenceName ,
        method: "GET"
      }).success(function(response){
        $scope.sequence = response;
      });
    };

    $scope.getSkills = function(topic) {
      $scope.topicId = topic._id;
      $scope.selectedTopic = topic.name;
      $scope.currentTopic = topic;

      $http({
        url: '/api/skillsbytopic',
        method: "POST",
        data: {
          topicId: $scope.topicId,
          gradeSubjectCode: $scope.skillCode(),
        }
      }).success(function(response){
        $scope.skills = response;
      });

    };
      // Find a list of Skills
    $scope.find = function () {
      $scope.skills = Skills.query();
    };

    // Find existing Skills
    $scope.findOne = function () {
      $scope.skill = Skills.get({
        skillId: $stateParams.skillId
      });
      $scope.init();
    };
  }
]);

