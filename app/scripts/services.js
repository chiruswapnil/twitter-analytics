'use strict';

angular.module('twitterApp')
    .constant("baseURL","http://localhost:3000/")
    
    .factory('tweetFactory', ['$http', 'baseURL', function($http,baseURL) {
    
            var tweetfac = {};
            tweetfac.getTweets = function(){
                return $http.get(baseURL);
            };
    
            return tweetfac;
        }])

;