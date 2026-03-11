const container = document.getElementById("weatherContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const cities = [
{name:"Delhi", lat:28.61, lon:77.20},
{name:"London", lat:51.50, lon:-0.12},
{name:"Tokyo", lat:35.68, lon:139.69}
];

function weatherEmoji(code){

if(code === 0) return "☀️";
if(code <= 3) return "⛅";
if(code <= 48) return "🌫";
if(code <= 67) return "🌧";
if(code <= 77) return "❄️";
if(code <= 99) return "⛈";

return "🌍";
}

function createCard(city,temp,code){

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<h2>${city}</h2>
<div class="emoji">${weatherEmoji(code)}</div>
<div class="temp">${temp}°C</div>
`;

container.appendChild(card);
}

async function fetchWeather(city){

const url=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

const res=await fetch(url);

if(!res.ok) throw new Error("API Error");

const data=await res.json();

return {
city:city.name,
temp:data.current_weather.temperature,
code:data.current_weather.weathercode
};

}

async function loadWeather(){

try{

const promises=cities.map(fetchWeather);

const results=await Promise.all(promises);

loading.style.display="none";

results.forEach(r=>{
createCard(r.city,r.temp,r.code);
});

}
catch(err){

loading.style.display="none";
error.innerText="⚠ Failed to load weather data";

}

}

loadWeather();