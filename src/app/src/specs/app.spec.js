'use strict';

describe('WeatherMan App Tests', function(){

    beforeEach(module('pkWeatherman')); //load module 

    describe('mainCtrl', function() {

        var $scope, $controller,mainCtrl;
    
        beforeEach(module('myApp'));
    
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
            mainCtrl = $controller('mainCtrl', {'$scope': $scope});
        }));
    
        it('should exist', function() {
            expect(mainCtrl).toBeDefined();
        });

        //On page load all fields are empty so submit button is disabled
        it('should be disabled on page load', function() {
            expect($scope.disableSubmit).toBe(true);
        });

        
        //check if googleapi returned lat and long details
        it('Latitude and Longitude Details Exist', function() {
           
            $scope.getGeoLocation();
             expect($scope.lat).toBeDefined();
             expect($scope.lon).toBeDefined();
        });

    })


    //Unit test for the weatherman services and weather API
    describe('weatherManServicesTest', function() {

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
            mainCtrl = $controller('mainCtrl', {'$scope': $scope});
        }));

        var weatherManServices = {} , httpBackend;
        
        beforeEach(inject(function($httpBackend, _$weatherManServices_){
            httpBackend = $httpBackend;
            weatherManServices = _$weatherManServices_;
        }));

        it('Spec for Response validation', function() {
             var responseReturned = {},
                 url = "https://api.openweathermap.org/data/2.5/forecast" + "?lat=" +  $scope.lat + "&lon=" +  $scope.lon + "&appid=c4bba93d2547c350e72bf5b0e84c90fa"
             
              httpBackend.expectGET(url).respond(responseReturned)

              var serviceCallResponse = weatherManServices.getGeoLocation();
              var data;
              serviceCallResponse.then(function (response){
                data = response;
              });

              httpBackend.flush();
                          
              expect(data).toBe(responseReturned);
             
        });


    })
});
