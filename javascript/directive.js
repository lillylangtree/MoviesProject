angular.module('movieDBDirectives',[]).directive('movieInfoBox', function() {
  return {
    restrict: 'AEC',    // usage of the directive: A -> attribute, E -> element, C -> class (default: EC)
    scope: {
      movie: '=info'    // injects the 'movie' object that is given with the 'info' attribute
    },
    replace: true,      // replaces the directive DOM item with the template html (default: false)
    transclude: false,  // wraps the items inside the directive DOM (default: false)
    link: function (scope, elem, attrs) {
    	console.dir(elem);
    	console.dir(attrs);
    	if (scope.movie.vote_average > 7.5)
    			elem.addClass('redBorder');
    },
    controller: function($scope){
    	console.log("movie rating is: " + $scope.movie.vote_average)
    },
    templateUrl: 'templates/directives/movie-info-box.html'
  };
})
.directive('movieNav', function() {
  return {
    restrict: 'E',    // usage of the directive: A -> attribute, E -> element, C -> class (default: EC)
    scope: {
      'currentNav': '='
    },
    replace: true,      // replaces the directive DOM item with the template html (default: false)
    transclude: false,  // wraps the items inside the directive DOM (default: false)
    link: function (scope, elem, attrs) {
    	console.dir(elem);
    	console.dir(attrs);
    },
    controller: function($scope){
    	console.log("current nav is: " + $scope.currentNav)
    },
    templateUrl: 'templates/directives/movieNav.html'
  };
});
