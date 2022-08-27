
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
var day0 = document.querySelector('#day0')
var day1 = document.querySelector('#day1')
var day2 = document.querySelector('#day2')
var day3 = document.querySelector('#day3')
var day4 = document.querySelector('#day4')
var day5 = document.querySelector('#day5')

// temperature
var temp0 = document.querySelector('#temp0')
var temp1 = document.querySelector('#temp1')
var temp2 = document.querySelector('#temp2')
var temp3 = document.querySelector('#temp3')
var temp4 = document.querySelector('#temp4')
var temp5 = document.querySelector('#temp5')
// wind
var wind0 = document.querySelector('#wind0')
var wind1 = document.querySelector('#wind1')
var wind2 = document.querySelector('#wind2')
var wind3 = document.querySelector('#wind3')
var wind4 = document.querySelector('#wind4')
var wind5 = document.querySelector('#wind5')
// humidity
var humidity0 = document.getElementById('humidity0')
var humidity1 = document.getElementById('humidity1')
var humidity2 = document.getElementById('humidity2')
var humidity3 = document.getElementById('humidity3')
var humidity4 = document.getElementById('humidity4')
var humidity5 = document.getElementById('humidity5')
// UV Index
var uvIndex0 = document.getElementById('uvIndex')

// weather images
var weather0 = document.getElementById('weather0')
var weather1 = document.getElementById('weather1')
var weather2 = document.getElementById('weather2')
var weather3 = document.getElementById('weather3')
var weather4 = document.getElementById('weather4')
var weather5 = document.getElementById('weather5')

console.log(city.value)

var getCoordinates = ``
var coordinates = ``

submit.addEventListener('click', showResponse)


function showResponse(event){
    event.preventDefault();

    var city = document.getElementById('city')
    getCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=${api.key}`
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
            temp0.textContent = `Temp: ${temp[0]}F` 
            temp1.textContent = `Temp: ${temp[1]}F` 
            temp2.textContent = `Temp: ${temp[2]}F` 
            temp3.textContent = `Temp: ${temp[3]}F` 
            temp4.textContent = `Temp: ${temp[4]}F` 
            temp5.textContent = `Temp: ${temp[5]}F` 

            console.log(windspeed);
    // assigning windspeed to variables at the top linked to html ids
            wind0.textContent = `Wind: ${windspeed[0]}mph` 
            wind1.textContent = `Wind: ${windspeed[1]}mph` 
            wind2.textContent = `Wind: ${windspeed[2]}mph` 
            wind3.textContent = `Wind: ${windspeed[3]}mph` 
            wind4.textContent = `Wind: ${windspeed[4]}mph` 
            wind5.textContent = `Wind: ${windspeed[5]}mph`
    
    // assigning windspeed to variables at the top linked to html ids
            humidity0.textContent = `Humidity: ${humidity[0]}%`
            humidity1.textContent = `Humidity: ${humidity[1]}%`
            humidity2.textContent = `Humidity: ${humidity[2]}%`
            humidity3.textContent = `Humidity: ${humidity[3]}%`
            humidity4.textContent = `Humidity: ${humidity[4]}%`
            humidity5.textContent = `Humidity: ${humidity[5]}%`
        //     for(i = 0; i <= 5; i++){
        //     humidity[i].textContent = `Humidity: ${humidity[i]}%`
        //     }
    // UV index of current day
            uvIndex0.textContent = `UV-Index: ${uvIndex}`
            console.log(uvIndex)

            console.log(humidity)
            console.log(weatherSource)
            weatherIcon();
        })

}

function getTime(){
    day0.textContent = moment().format('MMMM Do YYYY');
    day1.textContent = moment().add(1, 'days').format('MMMM Do YYYY');
    day2.textContent = moment().add(2, 'days').format('MMMM Do YYYY'); 
    day3.textContent = moment().add(3, 'days').format('MMMM Do YYYY'); 
    day4.textContent = moment().add(4, 'days').format('MMMM Do YYYY');
    day5.textContent = moment().add(5, 'days').format('MMMM Do YYYY');
};

function weatherIcon(){
// current day
    if(weatherSource[0]== 'Clouds'){
        weather0.textContent = '⛅'
    }else if(weatherSource[0]== 'Rain'){
        weather0.textContent = '🌦️'
    }else if(weatherSource[0]== 'Clear'){
        weather0.textContent = '🌞'
    }
// day1
    if(weatherSource[1]== 'Clouds'){
        weather1.textContent = '⛅'
    }else if(weatherSource[1]== 'Rain'){
        weather1.textContent = '🌦️'
    }else if(weatherSource[1]== 'Clear'){
        weather1.textContent = '🌞'
    }
// day2
    if(weatherSource[2]== 'Clouds'){
        weather2.textContent = '⛅'
    }else if(weatherSource[2]== 'Rain'){
        weather2.textContent = '🌦️'
    }else if(weatherSource[2]== 'Clear'){
        weather2.textContent = '🌞'
    }
// day3
    if(weatherSource[3]== 'Clouds'){
        weather3.textContent = '⛅'
    }else if(weatherSource[3]== 'Rain'){
        weather3.textContent = '🌦️'
    }else if(weatherSource[3]== 'Clear'){
        weather3.textContent = '🌞'
    }
// day4
    if(weatherSource[4]== 'Clouds'){
        weather4.textContent = '⛅'
    }else if(weatherSource[4]== 'Rain'){
        weather4.textContent = '🌦️'
    }else if(weatherSource[4]== 'Clear'){
        weather4.textContent = '🌞'
    }
// day5
    if(weatherSource[5]== 'Clouds'){
        weather5.textContent = '⛅'
    }else if(weatherSource[5]== 'Rain'){
        weather5.textContent = '🌦️'
    }else if(weatherSource[5]== 'Clear'){
        weather5.textContent = '🌞'
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
