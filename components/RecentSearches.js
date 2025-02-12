"use client";

import React, { useEffect, useState } from "react";

export default function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recent searches from the API
  const fetchRecentSearches = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/weather", { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to fetch recent searches");
      }

      const data = await response.json();
      setRecentSearches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", color: "#0070f3" }}>Recent Searches</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {recentSearches.map((search, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{search.city}, {search.country}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
