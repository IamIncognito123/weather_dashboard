const api = {
    key: 'af2b8cf771c6e5a5786673756f8b170b',
};


console.log(api.key);

console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=${api.key}`)

const form = document.getElementById('form')
var submit = document.getElementById('searchBtn')

var currentCity = document.querySelector('.currentCity')
var newEl = document.createElement('h2')

var newCity1El = document.createElement('h3'); 
var newCity2El = document.createElement('h3'); 
var newCity3El = document.createElement('h3'); 
var city1 = document.querySelector('#city1');
var city2 = document.querySelector('#city2');
var city3 = document.querySelector('#city3');

var temp = []
var windspeed = []
var humidity = []
var uvIndex = []
var weatherSource = []

// day

// var day1 = document.querySelector('#day1')
// var day2 = document.querySelector('#day2')
// var day3 = document.querySelector('#day3')
// var day4 = document.querySelector('#day4')
// var day5 = document.querySelector('#day5')

// temperature
// var temp0 = document.querySelector('#temp0')
// var temp1 = document.querySelector('#temp1')
// var temp2 = document.querySelector('#temp2')
// var temp3 = document.querySelector('#temp3')
// var temp4 = document.querySelector('#temp4')
// var temp5 = document.querySelector('#temp5')

// // wind
// var wind0 = document.querySelector('#wind0')
// var wind1 = document.querySelector('#wind1')
// var wind2 = document.querySelector('#wind2')
// var wind3 = document.querySelector('#wind3')
// var wind4 = document.querySelector('#wind4')
// var wind5 = document.querySelector('#wind5')

// // humidity
// var humidity0 = document.getElementById('humidity0')
// var humidity1 = document.getElementById('humidity1')
// var humidity2 = document.getElementById('humidity2')
// var humidity3 = document.getElementById('humidity3')
// var humidity4 = document.getElementById('humidity4')
// var humidity5 = document.getElementById('humidity5')
// UV Index
var uvIndex0 = document.getElementById('uvIndex')

// // weather images
// var weather0 = document.getElementById('weather0')
// var weather1 = document.getElementById('weather1')
// var weather2 = document.getElementById('weather2')
// var weather3 = document.getElementById('weather3')
// var weather4 = document.getElementById('weather4')
// var weather5 = document.getElementById('weather5')

console.log(city.value)

var getCoordinates = ``
var coordinates = ``

submit.addEventListener('click', showResponse)


function showResponse(event){
    event.preventDefault();

    var city = document.getElementById('city')
    getCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=${api.key}`
    console.log(getCoordinates)

    console.log(city.value)
    newEl.textContent = city.value;
    currentCity.appendChild(newEl);
    storeCity();

    getCity();
}

function getCity(){
    fetch(getCoordinates)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data[0].lat)
            var lat = data[0].lat
            var lon = data[0].lon
            coordinates = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api.key}`
            console.log(coordinates)
            getWeather();
            getTime();
        })
    
}

var savedCities= []
function storeCity(){

    if(savedCities.length == 0){
        localStorage.setItem('city1', city.value);
        var storeCity1 = localStorage.getItem('city1')
        savedCities.push(storeCity1);
        newCity1El.textContent = savedCities[0];
        city1.appendChild(newCity1El);
    }else if(savedCities.length == 1){
        localStorage.setItem('city2', city.value);
        var storeCity2 = localStorage.getItem('city2')
        savedCities.push(storeCity2);
        newCity2El.textContent = savedCities[1];
        city2.appendChild(newCity2El);
    }else if(savedCities.length == 2){
        localStorage.setItem('city3', city.value);
        var storeCity3 = localStorage.getItem('city3')
        savedCities.push(storeCity3);
        newCity3El.textContent = savedCities[2];
        city3.appendChild(newCity3El);
    }

}


function getWeather(){
    // grabbing weather data
    console.log(coordinates)
    fetch(coordinates)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
    // grabbing temperature and pushing into empty array
    // grabbing windspeed and pushing into empty array
            for(let i = 0; i <= 5; i++){
                temp[i] = data.daily[i].temp.day;
                windspeed[i] = data.daily[i].wind_speed;
                humidity[i] =data.daily[i].humidity;
                uvIndex = data.daily[0].uvi;
                weatherSource[i]=data.daily[i].weather[0].main;
            }

            console.log(temp);
    // assigning temperature to variables at the top linked to html ids
        var tempArr = [temp0, temp1, temp2, temp3, temp4, temp5]
            for(let i = 0; i <= tempArr.length - 1; i++){
                tempArr[i].textContent = `Temp: ${temp[i]}F` 
            }

            console.log(windspeed);
    // assigning windspeed to variables at the top linked to html ids
        var windArr= [wind0, wind1, wind2, wind3, wind4, wind5]
            for(let i = 0; i <= windArr.length - 1; i++){
                windArr[i].textContent = `Wind: ${windspeed[i]}mph` 
            }
    
    // assigning windspeed to variables at the top linked to html ids
        var humidityArr = [humidity0, humidity1, humidity2, humidity3, humidity4, humidity5];
            for(let i = 0; i <= humidityArr.length - 1; i++){
                humidityArr[i].textContent = `Humidity: ${humidity[i]}%`
            }

    // UV index of current day
            uvIndex0.textContent = `UV-Index: ${uvIndex}`
            console.log(uvIndex)

            console.log(humidity)
            console.log(weatherSource)
            weatherIcon();
        })

}

var dayArr = [day1, day2, day3, day4, day5]
function getTime(){
    for(let i = 0; i <= dayArr.length - 1; i++){
        day0.textContent = moment().format('MMMM Do YYYY');
        dayArr[i].textContent = moment().add(i + 1, 'days').format('MMMM Do YYYY');
    }
};

var weatherArr = [weather0, weather1, weather2, weather3, weather4, weather5]
function weatherIcon(){
    for(let i = 0; i <= weatherArr.length - 1; i++){
        if(weatherSource[i]== 'Clouds'){
            weatherArr[i].textContent = '⛅'
        }else if(weatherSource[i]== 'Rain'){
            weatherArr[i].textContent = '🌦️'
        }else if(weatherSource[i]== 'Clear'){
            weatherArr[i].textContent = '🌞'
        }
}

};

// click to display weather data for cities searched
city1.addEventListener('click', displayCity1)
city2.addEventListener('click', displayCity2)
city3.addEventListener('click', displayCity3)
function displayCity1(){
    getCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${savedCities[0]}&limit=5&appid=${api.key}`
    newEl.textContent = savedCities[0];
    currentCity.appendChild(newEl);
    getCity();
}
function displayCity2(){
    getCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${savedCities[1]}&limit=5&appid=${api.key}`
    newEl.textContent = savedCities[1];
    currentCity.appendChild(newEl);
    getCity();
}
function displayCity3(){
    getCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${savedCities[2]}&limit=5&appid=${api.key}`
    newEl.textContent = savedCities[2];
    currentCity.appendChild(newEl);
    getCity();
}
