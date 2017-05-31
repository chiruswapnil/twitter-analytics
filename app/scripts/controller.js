'use strict';
angular.module('twitterApp')
    
.controller('StatsController', ['$scope', 'tweetFactory', function($scope , tweetFactory) {
    
    $scope.foo = function(arr){
        var a = [], b = [], prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
        
        return [a, b];
    };
    $scope.showPieChart = false;
    $scope.message = "Loading ...";
    $scope.tweets = [];
    $scope.loc = [];
    tweetFactory.getTweets()
        .then(
            function(response){
                $scope.tweets = response.data;
                for (var i = 0, len = $scope.tweets.length; i < len; i++){
                    if($scope.tweets[i].user.location !== " " && $scope.tweets[i].user.location !== ""){
                        $scope.loc.push($scope.tweets[i].user.location.toString());
                    }
                }
                $scope.labels = $scope.foo($scope.loc)[0];
                $scope.data = $scope.foo($scope.loc)[1];
                
                //For Storing the places with only one tweet as 'others'
                $scope.others = 0;   
                for(var i=0, len = $scope.data.length; i < len; i++){
                    if($scope.data[i] < 2){
                        $scope.data.splice(i, 1);
                        $scope.labels.splice(i, 1);
                        i = 0;
                        len = $scope.data.length;
                        $scope.others++;
                    }
                }
                //$scope.labels.push("Others(Tweet<2)")
                //$scope.data.push(others);
                
                $scope.options = {legend: {display: true, position : 'bottom', fullWidth: true},
                                  title: {display: true, text: 'Split of tweets by location', fontSize: 38 },
                                 layout: {padding: {left:10, right: 10, top: 10, bottom: 10}}};
                $scope.showPieChart = true;
                
                //For Chart-2
                var p = 0, q = 0, r = 0, s = 0;
                var a = new Date("May 26, 2017 18:30:00");
                var b = new Date("May 26, 2017 18:40:00");
                var c = new Date("May 26, 2017 18:50:00");
                var d = new Date("May 28, 2017 17:10:00");
                var e = new Date("May 28, 2017 17:20:00");
                var f = new Date("May 28, 2017 17:30:00");
                //console.log(a);
                $scope.data1 = [];
                for (var i = 0, len = $scope.tweets.length; i < len; i++){
                    if( ((new Date($scope.tweets[i].created_at)) >= a) && ((new Date($scope.tweets[i].created_at)) <= b))
                        p++;   
                    else if(((new Date($scope.tweets[i].created_at)) >= b) && ((new Date($scope.tweets[i].created_at)) <= c))
                        q++; 
                    else if(((new Date($scope.tweets[i].created_at)) >= d) && ((new Date($scope.tweets[i].created_at)) <= e))
                        r++;
                    else if(((new Date($scope.tweets[i].created_at)) >= e) && ((new Date($scope.tweets[i].created_at)) <= f))
                        s++;
                }
                $scope.data1.push(p);
                $scope.data1.push(q);
                $scope.data1.push(r);
                $scope.data1.push(s);
                $scope.labels1 = ["May 26,2017 6:30PM - 6:40PM", "May 26,2017 6:40PM - 6:50PM","May 28,2017 5:10PM - 5:20PM", "May 28,2017 5:20PM - 5:30PM"]
                $scope.options1 = {legend: {display: true, position : 'bottom', fullWidth: true},
                                  title: {display: true, text: 'Number of tweets Time-wise', fontSize: 38 },
                                 layout: {padding: {left:10, right: 10, top: 10, bottom: 10}}};
                $scope.showLineChart = true;
    
            },
            function(response){
                $scope.message = "Error: "+response.status+" "+ response.statusText;
            }
    );
    
    $scope.chartSelect = "pie";
    $scope.chartSelect1 = "line";
    
}])

.controller('ListController', ['$scope', 'tweetFactory', function($scope, tweetFactory) {
    
    $scope.showTable = false;
    $scope.message = "Loading ...";
    $scope.tweets = [];
    tweetFactory.getTweets()
        .then(
            function(response){
                $scope.tweets = response.data;
                for (var i = 0, len = $scope.tweets.length; i < len; i++){
                    $scope.tweets[i].created_at = new Date($scope.tweets[i].created_at);
                }
                $scope.showTable = true;
            },
            function(response){
                $scope.message = "Error: "+response.status+" "+ response.statusText;
            }
    );
    
    $scope.sortKey = 'created_at';
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   
        $scope.reverse = !$scope.reverse; 
    };
    
    $scope.show = false;
    $scope.tweet_details;
    $scope.openTweet = function(_tweet){
        $scope.show = true;
        $scope.tweet_details = _tweet;
    };
    
    $scope.hideMe = function(){
        $scope.show = !$scope.show;
    }
    
    $scope.listSelect = "";
    
}])
        
.controller('IndexController', ['$scope', function($scope) {
    
}])

;
