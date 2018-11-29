/*global angular */
(function () {
	'use strict';
	angular.module('pkWeatherman')
		.factory("weatherManServices",['$http',function($http) {

		var services = {};

		services.getGeoLocation = function(pAddress){
			var geoLocationAPI = "https://maps.googleapis.com/maps/api/geocode/json" + "?address=" + pAddress + "&key=AIzaSyAN9o32ZljOZo30sJ8_sWxerfQqfTYT2gM" ;

		  return  $http.get(geoLocationAPI).then(
					function(response) {
						return response;
					},
					function(error) {
						return error;
				});	

		}	


		services.getCurrentWeather = function(pLat, pLon){
					
			//var currentDayUrl = "https://samples.openweathermap.org/data/2.5/weather" + "?zip=" +  pZip + "&appid=b6907d289e10d714a6e88b30761fae22";
			//var weatherLocAPI = "https://samples.openweathermap.org/data/2.5/weather" + "?lat=" +  pLat + "&lon=" +  pLon + "&appid=b6907d289e10d714a6e88b30761fae22";
			var weatherLocAPI = "https://api.openweathermap.org/data/2.5/weather" + "?lat=" +  pLat + "&lon=" +  pLon + "&appid=c4bba93d2547c350e72bf5b0e84c90fa";
				return $http.get(weatherLocAPI).then(
					function(response) {
		        		return response;
		        	},
		        	function(error) {
		        		return error;
		    	});	
			
			
		};


		services.getForecast = function(pLat, pLon){
					
			var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast" + "?lat=" +  pLat + "&lon=" +  pLon + "&appid=c4bba93d2547c350e72bf5b0e84c90fa";
				return $http.get(forecastAPI).then(
					function(response) {
		        		return response;
		        	},
		        	function(error) {
		        		return error;
		    	});	
			
			
		};
			
		return services;
	}])



})();