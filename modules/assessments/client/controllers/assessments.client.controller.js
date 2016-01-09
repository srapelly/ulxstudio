'use strict';

// Skills controller
angular.module('assessments').controller('AssessmentsController', ['$scope', '$stateParams' , '$location', '$filter', 'Authentication', 'Assessments', 'Templates', '$http',
  function ($scope, $stateParams, $location, $filter, Authentication, Assessments, Templates, $http) {
    $scope.authentication = Authentication;
    $scope.currentGrade = null;
    $scope.currentSubject = null;
    $scope.currentTopic = null;
    $scope.selectedTopic = "Select Topic";
    $scope.skillSelected = false;
    $scope.template = {templateText: ''};
    $scope.assessmentPreview = {assessmentTitle: '', assessmentBody:'', answers:[]};

    $scope.isPreview = false;

    // Create new Assessments
    $scope.create = function (isValid) {
      $scope.error = null;
      var answers = [];

      if ($scope.answer1) { answers.push($scope.answer1);}
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'skillForm');

        return false;
      }

      // Create new Skills object
      //assessmentsRef = grade_subject_topicindex_skillcode_skillindex
      var assessment = new Assessments({
        name: $scope.name,
        body: $scope.assessmentPreview.assessmentBody,
        questionTemplateId: $scope.currentTemplate._id,
        answerTemplateId: $scope.answerTemplate ?  $scope.answerTemplate._id : null,
        skillId: $scope.currentSkill._id,
        answers: answers,
        skillIndex: $scope.currentSkill.index
      });

      // Redirect after save
      assessment.$save(function (response) {
        $scope.name = '';
        $scope.currentSkill = null;
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing assessment
    $scope.remove = function (assessment) {
      if (assessment) {
        assessment.$remove();

        for (var i in $scope.topics) {
          if ($scope.assessments[i] === assessment) {
            $scope.assessments.splice(i, 1);
          }
        }
      } else {
        $scope.assessment.$remove(function () {
          $location.path('assessments');
        });
      }
    };

    // Update existing Skills
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'assessmentForm');

        return false;
      }

      var assessment = $scope.assessment;

      assessment.$update(function () {
        $location.path('assessments/' + assessment._id);
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
          $scope.currentGrade = $scope.skill.gradeId;
        } else {
          $scope.selectedGrade = "Select Grade";
          $scope.currentGrade = $scope.grades[0];
        }
      });

      $http({
        url: '/api/subjects',
        method: "GET"
      }).success(function(response){
        $scope.subjects = response;
        if ($scope.skill && $scope.skill.$resolved) {
          $scope.currentSubject = $scope.skill.subjectId;
        } else {
          $scope.selectedSubject = "Select Subject";
          $scope.currentSubject = $scope.subjects[0];
        }
      });

      Templates.query(function (data) {
        $scope.alltemplates = data;
        $scope.selectedTemplate = "Select Template";
        $scope.templates = $filter('filter')($scope.alltemplates, {
          $: 'Question'
        });
        $scope.answerTemplates = $filter('filter')($scope.alltemplates, {
          $: 'Answer'
        });
      });
    };

    $scope.selectTemplate = function (template) {
      $scope.currentTemplate = template;
      $scope.selectedTemplate = template.name;
    };

    $scope.selectGrade = function(grade) {
      $scope.currentGrade = grade;
      $scope.selectedGrade = grade.name;
    };

    $scope.selectSubject = function(subject) {
      $scope.currentSubject = subject;
      $scope.selectedSubject = subject.name;

      $http({
        url: '/api/topicsbygradesubject',
        method: "POST",
        data: {
          gradeId: $scope.currentGrade._id,
          subjectId: $scope.currentSubject._id
        }
      }).success(function(response){
        $scope.topics = response;
        $scope.selectedTopic = "Select Topic";
      });
    };


    $scope.selectTopic = function(topic) {
      $scope.currentTopic = topic;
      $scope.selectedTopic = topic.name;
      $scope.getSkills(topic);
    };

    $scope.selectSkill = function(skill) {
      $scope.currentSkill = skill;
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
        $scope.currentSkill = $scope.skills[0];
      });

    };

    $scope.skillCode = function () {
      var code = "";
      if ($scope.currentGrade && $scope.currentSubject) {
        code = 'grade' + $scope.currentGrade.standard + '_' + $scope.currentSubject.code || '';
      }
      return code;
    };

    $scope.selectSkill = function(skill) {
      $scope.skillId = skill._id;
      $scope.currentSkill = skill;
    };
      // Find a list of Skills
    $scope.find = function () {
      $scope.assessments = Assessments.query();
    };

    // Find existing Skills
    $scope.findOne = function () {
      $scope.assessment = Assessments.get({
        assessmentId: $stateParams.assessmentId
      });
      //$scope.init();
    };

    $scope.preview = function () {
      var tbody = angular.element(document.querySelector('#bootwysi'));
      $scope.template.templateText = tbody.val();
      var previewElement = angular.element(document.querySelector('#assessmentPreviewId'));
      //$scope.isPreview = true;
      $scope.assessmentPreview.assessmentBody = '<div class="form-group">' + $scope.template.templateText  + '</div> ' + previewElement.html();
    };
  }
]);

angular.module('templates').directive('widgestWysihtml5', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).wysihtml5();
    }
  };
});


angular.module('assessments').config(function($compileProvider){
  $compileProvider.directive('previewTemplate', function($compile) {
    if($compile) {
      console.log('compile value exists');
    }
    // directive factory creates a link function
    return function(scope, element, attrs) {
      scope.$watch(
          function(scope) {
            // watch the 'compile' expression for changes
            return scope.$eval(attrs.previewTemplate);
          },
          function(value) {
            console.log(value);
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
      );
    };
  });
});
