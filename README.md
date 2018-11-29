# Weather Man - This App provides weather information based on user entered address. 
# How this App  works :

User can enter any  one value State, City , Zip and can the current weather at that location. Along with that we also have an option to look for weather conditions for whole week .

Based on the city, state, Zip entered we get the geolocation of the USER using google maps API and then call openweather API for current and future forecast. 

![](src/app/src/assets/UserForm.PNG)
![](src/app/src/assets/CurrentWeather.PNG)
![](src/app/src/assets/FutureForecast-1week.PNG)

# Stack :  
Angular 1.6 , ES5 , Karma-Jasmine , Phantom JS , Yarn , http-server for local server. 

# How to Run:
yarn install
http-server -a localhost -o --cors

#Next Updates 
 Test Cases, PhantomJS issue needs to be fixed
 More UI
 More Live Features 

