import { useState } from 'react'
import reactLogo from './assets/vite.svg'

function App() {
  const api_key = import.meta.env.VITE_API_KEY
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]  =  useState("");
  
  async function getWeather() {
    if(!city){setError("Enter city name");}

    setLoading(true);
    const res= await fetch(
 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    const data = await res.json();
    if (data.cod !== 200) {
    setError(data.message);
    setWeather(null);
    setLoading(false);
    return;
}
    setError("");
    
    setWeather(data)
    setLoading(false);
  }

  return(
      <div>
        <h1> Weather Application</h1>
        <input
          type = "text"
          placeholder='Enter city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {if(e.key == "Enter") getWeather();}}
          />
          <button onClick={getWeather}>Search</button>
          {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          
          <h2>{weather.main.temp} °C</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
<p>🤒 Feels Like: {weather.main.feels_like} °C</p>
<p>💧 Humidity: {weather.main.humidity}%</p>
<p>🌬 Wind: {weather.wind.speed} m/s</p>
<p>🌍 Country: {weather.sys.country}</p>
        </div>
      )}
          
      </div>
    );
}

export default App
