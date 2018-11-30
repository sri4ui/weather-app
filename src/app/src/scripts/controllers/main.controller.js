(function(){

'use strict';

angular.module('pkWeatherman')
  .controller('mainCtrl' ,function ($scope,$http,weatherManServices) {

			$scope.disableSubmit = true;
			$scope.geoLocError = false;
			$scope.showweatherInfo = false;
			$scope.showForecast = false;
			  
			//$scope.showView = (viewName) => $scope.templateUrl = 'views/'+ viewName + '.html';
			$scope.showView = function(viewName){
				$scope.getMultipleDaysForecast(viewName);
			}
		
			$scope.enableSubmitButton = function(pCity, pState, pZip) {
				$scope.disableSubmit = ((angular.isUndefined(pCity) || pCity =="")  && (angular.isUndefined(pState) || pState =="")   && (angular.isUndefined(pZip) || pZip ==""))  ? true : false;
			}

			function getTime(ts){
						
							var date = new Date(ts*1000);
							var hrs = date.getHours();
							var mins = "0" + date.getMinutes();
							var secs = "0" + date.getSeconds();
							return hrs+ ':' + mins.substr(-2) + ':' + secs.substr(-2);  
			}

			$scope.getGeoLocation = function(){
				var reqAddr =  $scope.streetaddrs != undefined? $scope.streetaddrs : ""  + ',' 
							+  $scope.city != undefined? $scope.city : "" + ',' 
							+  $scope.state != undefined? $scope.state : ""  + ','
							+  $scope.zipCodeEntered != undefined? $scope.zipCodeEntered : ""  + ',';
							
				weatherManServices.getGeoLocation(reqAddr).then(function (response) {
					var geoLocDetails = angular.fromJson(response);
										
					if(geoLocDetails.data.status === "OK" && geoLocDetails.data.results.length > 0){
						$scope.geoLocError = false;
						$scope.formattedAddr = geoLocDetails.data.results[0].formatted_address;
						$scope.lat = geoLocDetails.data.results[0].geometry.location.lat;
						$scope.lng =  geoLocDetails.data.results[0].geometry.location.lng;
						
						//console.log(geoLocDetails.data.results[0].geometry.location.lng);

						$scope.getWeather();

					}else if(geoLocDetails.data.status == "ZERO_RESULTS" || geoLocDetails.data.results.length <=0){
						$scope.geoLocError = true;
						$scope.showweatherInfo = false;
					}
				});
			}


			$scope.getWeather = function(){

				if($scope.lat && $scope.lng){
					weatherManServices.getCurrentWeather($scope.lat, $scope.lng).then(function(response){
						var weatherDetails = angular.fromJson(response),
							ts = new Date();
						//console.log(weatherDetails);
						//console.log(ts.toLocaleTimeString(weatherDetails.data.sys.sunrise));
						$scope.showweatherInfo = true;
						$scope.sunrise = getTime(weatherDetails.data.sys.sunrise);
						$scope.sunset =  getTime(weatherDetails.data.sys.sunset);
						$scope.humidity = weatherDetails.data.main.humidity;
						$scope.temparature = weatherDetails.data.main.temp;
						//console.log(ts.toISOString($scope.sunrise));
					})	;
					//console.log(weatherManServices.getCurrentWeather($scope.zipCodeEntered));
					
				}else{
					$scope.geoLocError = true;
					$scope.showweatherInfo = false;
				}
			} 

			$scope.getMultipleDaysForecast = function(viewName){
				
				if($scope.lat && $scope.lng){
					weatherManServices.getForecast($scope.lat, $scope.lng).then(function(response){
						var forecastDetails = angular.fromJson(response),
						    obj = {};

						$scope.forecastList = forecastDetails.data.list;
						$scope.showForecast = true;
					})	;
					
				}else{
					$scope.geoLocError = true;
					$scope.showweatherInfo = false;
					$scope.showForecast = false;
				}

				$scope.templateUrl = 'views/'+ viewName + '.html';

			}
            
        })
}());
 
   
