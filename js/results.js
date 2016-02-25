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
	         $scope.words = [];
	         $scope.nothing = true;

	         $scope.$watch("searchTerms", function (val) {
	            $scope.words = [];

	            $scope.nothing = false;

	            if (!val || val === "") return;

	            $scope.nothing = true;

	            $scope.spinner = true;
	            datamuseService.getdatamuse(val)
                 .success(function (response) {
                    if (response && response.length > 0) {
                       $scope.nothing = false;

                       $scope.words = response;
                    }
                 },
                 function (error) {
                    alert(error);
                 })
                 .then(function () {
                    $scope.spinner = false;
                 });
	         });

	         $scope.getClass = function () {
	            if ($scope.spinner) {
	               return "results results-loading";
	            }
	            else if ($scope.nothing) {
	               return "results results-nothing";
	            }
	            else {
	               return "results";
	            }
	         };
	      }]
	   };
	}]);
})();