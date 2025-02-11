"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]); // State to hold recent searches

  const fetchWeather = async () => {
    if (!city.trim() || !country.trim()) {
      setError("City and country cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, country }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setWeatherData(data); // Store weather data in state
      setError(null);
      loadRecentSearches(); // Refresh recent searches after successful search
    } catch (err) {
      setWeatherData(null);
      setError(err.message); // Display any error
    } finally {
      setLoading(false);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const response = await fetch("/api");

      if (!response.ok) {
        throw new Error("Failed to fetch recent searches");
      }

      const searches = await response.json(); // Fetch recent searches from API
      setRecentSearches(searches);
    } catch (err) {
      console.error("Failed to load recent searches:", err);
      setError("Failed to load recent searches");
    }
  };

  useEffect(() => {
    loadRecentSearches(); // Load recent searches on component mount
  }, []);

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

      <section>
        <h2>Recently Searched</h2>
        <ul>
          {recentSearches.length === 0 ? (
            <li>No recent searches</li>
          ) : (
            recentSearches.map((search, index) => (
              <li key={index}>
                {search.city}, {search.country}
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
