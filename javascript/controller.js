angular.module('movieDBControllers',[])
.controller('MovieListController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.currentNav = 1;
 $scope.page = 1;
 $scope.title = 'Popular Movies'
 getMovies();
 
 function getMovies() {
	 var url = myMovieConfig.moviesEndpoint + '/popular?'+'page='+$scope.page + '&api_key=' + myMovieConfig.apiKey;
	 
	 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
		  $scope.page=result.data.page;
		  $scope.pages=result.data.total_pages;
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status);
        });
	}
 $scope.nextPage = function(){
	$scope.page++;
	getMovies();
 }
 $scope.prevPage = function(){
	$scope.page--;
	getMovies();
 }
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
.controller('MovieDetailsController',function($scope, $routeParams, MovieListService, myMovieConfig,$http,$sce,TrailerService) {
// 
   $scope.title = 'Movie Details';
   $scope.rottenError = false;
   $scope.trailer=false;
   var id = $routeParams.movieId;
   var url = myMovieConfig.moviesEndpoint + '/' + id + '?api_key=' + myMovieConfig.apiKey;
   MovieListService.getById(url).then(
      function(result){
          var movie=result.data;
          $scope.movie = movie; 
          url = myMovieConfig.rottenUri + '?i=' + movie.imdb_id + '&r=json&tomatoes=true';
          return MovieListService.getById(url);
          }
      ,
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
          }
      )
      .then(
        function(result){          
          // returning results from previous then
          $scope.rotten = result.data;
          console.dir(result.data)
           //This is the callback function
          var setData = function(trailer) {
                $scope.trailerSrc = $sce.trustAsResourceUrl("//v.traileraddict.com/" + trailer);
            }                 
          TrailerService.get(setData,$scope.rotten.imdbID.slice(2)); //service requires callback
          }      
       )
      .catch(
        function(error) { 
          console.log('error', error)
          $scope.rottenError = true;
          $scope.rottenMessage = 'No Rotten Data Available'
          }
        );
})
.controller('MovieErrorController',function($scope, $routeParams) {
// 
   $scope.message = $routeParams.message;
   $scope.status = $routeParams.status;
})
.controller('MenuController',function($scope, $location, $routeParams) {
// 
   $scope.path = $location.path();
   $scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
//   $scope.showMovies = function(){
//	return ($scope.path == '/popular' || $scope.path == '/topRated' || $scope.path == '/nowPlaying' 
//		|| $scope.path == '/upcoming')
//   }
});