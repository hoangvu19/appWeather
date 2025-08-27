import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = 'c852c29ea24d7a1c8d10828b5bd73619'

  const getWeather = async (e) => {
    e.preventDefault()
    
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      setWeather(response.data)
    } catch {
      setError('City not found or error fetching weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      
      <form onSubmit={getWeather} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="city-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weather && !error && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="temperature">
            <span className="temp">{Math.round(weather.main.temp)}°C</span>
            <span className="description">{weather.weather[0].description}</span>
          </div>
          <div className="details">
            <p data-label="Feels Like">{Math.round(weather.main.feels_like)}°C</p>
            <p data-label="Humidity">{weather.main.humidity}%</p>
            <p data-label="Wind Speed">{Math.round(weather.wind.speed * 3.6)} km/h</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
