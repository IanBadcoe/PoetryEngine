(function () {
   angular.module('datamuseServiceModule', [])
     .service('datamuseService', Service)

   function Service($http) {
      this.getdatamuse = function (searchTerms) {
         var url = makeUrl(searchTerms);
         //         return $http.jsonp(url);
         return $http({
            dataType: "json",
            method: 'GET',
            url: url
         });
      };
   };

   function makeUrl(searchTerms) {
      return [
        "https://api.datamuse.com/words?",
        searchTerms
      ].join('');
   }
})();
