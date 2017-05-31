'use strict';
angular.module('twitterApp', ['ui.router', 'chart.js', 'angularUtils.directives.dirPagination'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            
            // route for the aboutus page
            .state('app.list', {
                url:'list',
                views: {
                    'content@': {
                        templateUrl: 'views/list.html',
                        controller  : 'ListController'
                   }
                }
            })
            
            // route for the contactus page
            .state('app.stats', {
                url:'stats',
                views: {
                    'content@': {
                        templateUrl : 'views/stats.html',
                        controller  : 'StatsController'
                     }
                }
            });

            $urlRouterProvider.otherwise('/');
    })
;