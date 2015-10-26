angular.module('TrailerMovieServices',[])
.factory('NewTrailerService', ['$http',function($http){   
       return {
           get: function(imdbId){
                //var urlSource = "http://api.traileraddict.com/?imdb=" + imdbId + "&callback=JSON_CALLBACK";
                var urlSource = "https://www.myapifilms.com/taapi?" + imdbId + "&format=JSONP&callback=JSON_CALLBACK";
                return $http.jsonp(urlSource);
                }
              }
    }])
.factory('TrailerService', ['$http',function($http){   
       return {
           get: function(imdbId,callback){
                var xmlSource = "https://api.traileraddict.com/?imdb=" + imdbId;
                var yqlURL = [
                    "http://query.yahooapis.com/v1/public/yql",
                    "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
                    "&format=xml&callback=?"
                ].join("");

            // Now do the AJAX heavy lifting        
                $.getJSON(yqlURL, function(data){
                    xmlContent = $(data.results[0]);
                    var trailer = $(xmlContent).find("trailer_id").text();
                    console.log(trailer);
                    callback(trailer);
                });
              } 
          } 
    }]);
