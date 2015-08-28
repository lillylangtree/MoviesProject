angular.module('movieDBControllers',[])
.controller('MovieListController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.currentNav = 1;
 $scope.title = 'Popular Movies'
 var url = myMovieConfig.moviesEndpoint + '/popular?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status);
        });
})
.controller('MovieUpcomingController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.currentNav = 2;
 $scope.title = 'Upcoming Movies'
 var url = myMovieConfig.moviesEndpoint + '/upcoming?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
        });
})
.controller('MovieNowPlayingController',function($scope, $location, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.currentNav = 3;
 $scope.title = 'Now Playing Movies'
 var url = myMovieConfig.moviesEndpoint + '/now_playing?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
        });
})
.controller('MovieTopRatedController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.currentNav = 4;
 $scope.title = 'Top Rated Movies'
 var url = myMovieConfig.moviesEndpoint + '/top_rated?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status);
        });
})
.controller('MovieDetailsController',function($scope, $routeParams, MovieListService, myMovieConfig) {
// 
   $scope.title = 'Movie Details';
   $scope.rottenError = false;
   var id = $routeParams.movieId;
   var url = myMovieConfig.moviesEndpoint + '/' + id + '?api_key=' + myMovieConfig.apiKey;
   MovieListService.getById(url).then(
      function(result){
          console.log("in movie by id controller get then");
          $scope.movie = result.data; /*res.filter(function(val){return val !== null});;*/
          return(result.data);
          }
      ,
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
          }
      )
      .then(
        function(result){
          console.log("in movie by id next then");
          // returning results from previous then
          //$scope.movie = result.data; /*res.filter(function(val){return val !== null});;*/
          url = 'http://www.omdbapi.com/?i=' + result.imdb_id + '&r=json&tomatoes=true'
          return MovieListService.getById(url);
          }
      ,
        function(error) { 
          console.log('error', error)
          // id error show error message on screen
          $scope.rottenError = true;
          $scope.rottenMessage = 'No Rotten Data Available'
          }
        )
      .then(
        function(result){
          console.log("in movie by id next then with imdb id");
          // returning results from previous then
          //$scope.movie = result.data; /*res.filter(function(val){return val !== null});;*/
          $scope.rotten = result.data;
          }
      ,
        function(error) { 
          console.log('error', error)
          // id error show error message on screen
          $scope.rottenError = true;
          $scope.rottenMessage = 'No Rotten Data Available'
          }
        );

})
.controller('MovieErrorController',function($scope, $routeParams) {
// 
   $scope.message = $routeParams.message;
   $scope.status = $routeParams.status;
});