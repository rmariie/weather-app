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
      // Ensure the correct API endpoint

      if (!response.ok) {
        throw new Error("Failed to fetch recent searches. Please try again later.");
      }

      const data = await response.json();
      if (!data.length) {
        setError("No recent searches found.");
      } else {
        setRecentSearches(data);
      }
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
      {!loading && !error && recentSearches.length === 0 && (
        <p>No recent searches to display.</p>
      )}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {recentSearches.map((search) => (
          <li key={`${search.city}-${search.country}`} style={{ marginBottom: "0.5rem" }}>
            <strong>
              {search.city}, {search.country}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
