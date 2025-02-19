"use client";

export default function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "inline-block",
        textAlign: "left",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>
        Weather in {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Temperature:</strong> {weatherData.main.temp}°C
      </p>
      <p>
        <strong>Description:</strong> {weatherData.weather[0].description}
      </p>
    </div>
  );
}
// This is a simple component that displays the weather data. It takes in the weatherData prop and displays the city name, country, temperature, and weather description. If there is no weather data, it returns null.