'use strict';

angular.module('templates').controller('TemplatesListController', ['$scope', '$filter', 'Templates',
    function ($scope, $filter, Templates) {
        Templates.query(function (data) {
            $scope.templates = data;
            $scope.buildPager();
        });

        $scope.buildPager = function () {
            $scope.pagedItems = [];
            $scope.itemsPerPage = 15;
            $scope.currentPage = 1;
            $scope.filterTemplatesToDisplay();
        };

        $scope.filterTemplatesToDisplay = function () {
            $scope.filteredItems = $filter('filter')($scope.templates, {
                $: $scope.search
            });
            $scope.filterLength = $scope.filteredItems.length;
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;
            $scope.pagedItems = $scope.filteredItems.slice(begin, end);
        };

        $scope.pageChanged = function () {
            $scope.filterTemplatesToDisplay();
        };
    }
]);
