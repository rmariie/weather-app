// components/RecentSearches.js
import React, { useEffect, useState } from "react";

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch("/api"); // Assuming the `/api` route handles the GET for recent searches
        if (!response.ok) {
          throw new Error("Failed to fetch recent searches");
        }
        const data = await response.json();
        setRecentSearches(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecentSearches();
  }, []); // Fetch data on component mount

  return (
    <div
      style={{
        marginTop: "2rem",
        textAlign: "left",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#0070f3" }}>
        Recently Searched
      </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {recentSearches.map((search, index) => (
          <li
            key={index}
            style={{
              padding: "0.5rem 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            {search.city}, {search.country} —{" "}
            <span style={{ color: "#555" }}>
              {new Date(search.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
        {recentSearches.length === 0 && !error && <p>No recent searches found.</p>}
      </ul>
    </div>
  );
};

export default RecentSearches;
