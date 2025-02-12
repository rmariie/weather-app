"use client";

import React, { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]); // To store recent searches

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim() || !country.trim()) {
      setError("Both city and country fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, country }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unexpected error occurred");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent searches
  const fetchRecentSearches = async () => {
    try {
      const response = await fetch("/api/weather"); // Assuming GET request from your backend
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch recent searches");
      }

      const data = await response.json();
      setRecentSearches(data); // Store the recent searches in state
    } catch (err) {
      setError(err.message);
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
          fetchWeather();
        }}
        style={{ marginBottom: "2rem" }}
      >
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
          onChange={(e) => setCountry(e.target.value)}
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
            textAlign: "left",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </p>
        </div>
      )}

      <button
        onClick={fetchRecentSearches}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "2rem",
        }}
      >
        View Recent Searches
      </button>

      {recentSearches.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <h3>Recent Searches</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {recentSearches.map((search, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {search.city}, {search.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
