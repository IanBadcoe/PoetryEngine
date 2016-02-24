(function () {
   angular.module('app', ['results'])
        .controller('searchController', ['$scope', '$location', '$window', function ($scope, $location, $window) {
           $scope.sterms = "";

           reset();

           $scope.manyPattern = "[abcdefghijklmnopqrstuvwxyz, ]*";
           $scope.singlePattern = "[abcdefghijklmnopqrstuvwxyz ]*";
           $scope.spelledPattern = "[abcdefghijklmnopqrstuvwxyz\*\? ]*";

           $scope.$watch('rel_rhy', buildTerms);
           $scope.$watch('rel_nry', buildTerms);
           $scope.$watch('rel_hom', buildTerms);
           $scope.$watch('rel_cns', buildTerms);
           $scope.$watch('sl', buildTerms);
           $scope.$watch('ml', buildTerms);
           $scope.$watch('sp', buildTerms);
           $scope.$watch('rel_syn', buildTerms);
           $scope.$watch('rel_ant', buildTerms);
           $scope.$watch('rel_bga', buildTerms);
           $scope.$watch('rel_bgb', buildTerms);
           $scope.$watch('rel_jja', buildTerms);
           $scope.$watch('rel_jjb', buildTerms);
           $scope.$watch('rel_spc', buildTerms);
           $scope.$watch('rel_gen', buildTerms);
           $scope.$watch('rel_com', buildTerms);
           $scope.$watch('rel_par', buildTerms);

           // once, on load, we need to read the query into our local scope
           parseQuery();

           function buildTerms() {
              $scope.sterms = "";

              $scope.sterms += buildSingle("rel_rhy");
              $scope.sterms += buildSingle("rel_nry");
              $scope.sterms += buildSingle("rel_hom");
              $scope.sterms += buildSingle("rel_cns");
              $scope.sterms += buildSingle("sl");
              $scope.sterms += buildSingle("ml");
              $scope.sterms += buildSingle("sp");
              $scope.sterms += buildMany("rel_syn");
              $scope.sterms += buildMany("rel_ant");
              $scope.sterms += buildMany("rel_bga");
              $scope.sterms += buildMany("rel_bgb");
              $scope.sterms += buildMany("rel_jja");
              $scope.sterms += buildMany("rel_jjb");
              $scope.sterms += buildMany("rel_spc");
              $scope.sterms += buildMany("rel_gen");
              $scope.sterms += buildMany("rel_com");
              $scope.sterms += buildMany("rel_par");

              $scope.sterms = $scope.sterms.substr(1);

              $location.search($scope.sterms);
           }

           function buildMany(code) {
              var words = $scope[code];

              if (!words) return "";

              var ary = words.split(",");

              var ret = "";

              for (var k in ary) {
                 var s = ary[k];

                 ret += buildSingleInner(s, code);
              }

              return ret;
           }

           function buildSingle(code) {
              var word = $scope[code];

              return buildSingleInner(word, code);
           }

           function buildSingleInner(word, code) {
              var ret = "";

              if (word) {
                 ret += "&" + code + "=" + word.trim();
              }

              return ret;
           }

           function parseQuery() {
              var here_sterms = $window.location.hash.substr(2);

              // we seem to come around here over and over???
              if (here_sterms === $scope.sterms) return;

              reset();

              var terms = here_sterms.split("&");

              for (var t in terms) {
                 var ss = terms[t].split("=");

                 if ($scope[ss[0]] !== "")
                    $scope[ss[0]] += ", ";

                 $scope[ss[0]] += decodeURIComponent(ss[1]);
              }
           }

           function reset() {
              $scope.rel_rhy = "";
              $scope.rel_nry = "";
              $scope.rel_hom = "";
              $scope.rel_cns = "";
              $scope.sl = "";
              $scope.ml = "";
              $scope.sp = "";
              $scope.rel_syn = "";
              $scope.rel_ant = "";
              $scope.rel_bga = "";
              $scope.rel_bgb = "";
              $scope.rel_jja = "";
              $scope.rel_jjb = "";
              $scope.rel_spc = "";
              $scope.rel_gen = "";
              $scope.rel_com = "";
              $scope.rel_par = "";
           }
        }]);
})();
