"use client";

import React, { useState } from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherDisplay from "@/components/WeatherDisplay";
import RecentSearches from "@/components/RecentSearches";

export default function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("City cannot be empty");
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
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#0070f3", marginBottom: "1rem" }}>
        Today's Weather
      </h1>

      {/* Weather Form Component */}
      <WeatherForm
        city={city}
        country={country}
        setCity={setCity}
        setCountry={setCountry}
        fetchWeather={fetchWeather}
      />

      {/* Loading, Error, or Weather Display */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <WeatherDisplay weatherData={weatherData} />

      {/* Recent Searches Toggle */}
      <button
        onClick={() => setShowRecentSearches(!showRecentSearches)}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          marginTop: "2rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showRecentSearches ? "Hide Recent Searches" : "Show Recent Searches"}
      </button>

      {/* Recent Searches Component */}
      {showRecentSearches && <RecentSearches />}
    </main>
  );
}
