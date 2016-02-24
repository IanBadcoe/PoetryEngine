(function () {
   angular.module("results", ["datamuseServiceModule"])
	.directive("results", ['datamuseService', function (datamuseService) {
	   return {
	      scope: {
	         searchTerms: "="
	      },
	      templateUrl: "templates/results_template.html",
	      restrict: "E",
	      controller: ['$scope', '$element', function ($scope, $element) {
	         $scope.$watch("searchTerms", function (val) {
	            $scope.words = [];
	            if (!val || val === "") return;

	            $scope.spinner = true;
	            datamuseService.getdatamuse(val)
                 .success(function (response) {
                    $scope.words = response;
                 },
                 function (error) {
                    alert(error);
                 })
                 .then(function () {
                    $scope.spinner = false;
                 });
	         });
	      }]
	   };
	}]);
})();