const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const historyList = document.getElementById("historyList");
const consoleLog = document.getElementById("consoleLog");

const cityText = document.getElementById("city");
const tempText = document.getElementById("temp");
const weatherText = document.getElementById("weather");
const humidityText = document.getElementById("humidity");
const windText = document.getElementById("wind");

window.onload = loadHistory;

function log(text){
consoleLog.textContent += text + "\n";
}

searchBtn.addEventListener("click", ()=>{

const city = cityInput.value.trim();

if(city===""){
alert("Enter city");
return;
}

getWeather(city);

});

async function getWeather(city){

consoleLog.textContent="";

log("Sync: Start");
log("Async: Start fetching");

try{

const geoURL=`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

const geoRes = await fetch(geoURL);
const geoData = await geoRes.json();

if(!geoData.results){
throw new Error("City not found");
}

const lat=geoData.results[0].latitude;
const lon=geoData.results[0].longitude;
const name=geoData.results[0].name;

const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m`;

const weatherRes = await fetch(weatherURL);
const weatherData = await weatherRes.json();

cityText.textContent = name;
tempText.textContent = weatherData.current.temperature_2m + " °C";
weatherText.textContent = "Clear";
humidityText.textContent = weatherData.current.relative_humidity_2m + " %";
windText.textContent = weatherData.current.windspeed_10m + " km/h";

saveHistory(name);

log("Promise: Data received");
log("Async: Done");

}catch(err){

log("Error: "+err.message);

}

}

function saveHistory(city){

let history=JSON.parse(localStorage.getItem("cities"))||[];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities",JSON.stringify(history));
}

loadHistory();

}

function loadHistory(){

historyList.innerHTML="";

let history=JSON.parse(localStorage.getItem("cities"))||[];

history.forEach(city=>{

const btn=document.createElement("button");

btn.textContent=city;

btn.onclick=()=>getWeather(city);

historyList.appendChild(btn);

});

}