"use client";

import React, { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim() || !country.trim()) {
      setError("City and country cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update fetch URL to point to the correct API route in the 'api' folder
      const response = await fetch("/api", {  // Assuming your route.js is directly in the 'api' folder
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, country }),  // Pass city and country
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setWeatherData(data);  // Store weather data in state
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);  // Display any error
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#0070f3", marginBottom: "1rem" }}>
        Today's Weather
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();  // Call fetchWeather on form submit
        }}
        style={{ marginBottom: "2rem" }}
      >
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}  // Update city state
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Enter a country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}  // Update country state
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
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
      )}
    </main>
  );
}
