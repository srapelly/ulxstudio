'use strict';

// Skills controller
angular.module('templates')
.controller('TemplatesController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Templates', '$http',
  function ($scope, $stateParams, $location, $filter, Authentication, Templates, $http) {
    $scope.authentication = Authentication;
    $scope.templateType = "Question";
    $scope.template = {templateText:'', templateResult:'', templateBody: ''};
    // Create new templates
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'templateForm');

        return false;
      }

      // Create new Skills object
      var template = new Templates({
        name: $scope.name,
        template: $scope.template.templateBody,
        templateType: $scope.templateType
      });

      // Redirect after save
      template.$save(function (response) {
        $location.path('templates/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.template = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing templates
    $scope.remove = function (template) {
      if (template) {
        template.$remove();

        for (var i in $scope.topics) {
          if ($scope.templates[i] === template) {
            $scope.templates.splice(i, 1);
          }
        }
      } else {
        $scope.template.$remove(function () {
          $location.path('templates');
        });
      }
    };

    // Update existing templates
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'templateForm');

        return false;
      }

      var template = $scope.template;

      template.$update(function () {
        $location.path('templates/' + template._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.init = function() {
    };

    $scope.preview = function() {
      //$scope.template.templateBody = $scope.template.templateResult;
    };

      // Find a list of Templates
    $scope.find = function () {
      $scope.templates = Templates.query();
    };

    // Find existing Skills
    $scope.findOne = function () {
      $scope.template = Templates.get({
        templateId: $stateParams.templateId
      });
    };
  }
]);


angular.module('templates').config(function($compileProvider){
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





