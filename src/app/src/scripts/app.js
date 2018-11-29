'use strict';

angular
  .module('pkWeatherman', [
    'ngRoute'
    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'    
      })
      .otherwise({
        redirectTo: '/'
      }); 
  });
