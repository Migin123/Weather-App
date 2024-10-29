const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temparature-value p");
const descElement = document.querySelector(".temparature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

var input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        city = input.value;
        getSearchWeather(city);
    }
});

const weather = {};
weather.temperature = {
    unit: "celsius"
};

const KELVIN = 273;
const key = '52ebfd35a35ee68da18a67416cfb99ee';

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesn\'t support geolocation</p>';
}

function setPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

locationIcon.addEventListener("click", function(){
    getWeather(latitude, longitude);
});

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getSearchWeather(city){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}.png" alt="Weather icon">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
