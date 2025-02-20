"use client";

import React, { useEffect, useState } from "react";

export default function RecentSearches() { // Component to display recent searches
  const [recentSearches, setRecentSearches] = useState([]); // State to store recent searches
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track error state 


  // Fetch recent searches from the API
  const fetchRecentSearches = async () => {
    setLoading(true); // Set loading state to true its a function to fetch recent searchesm that sets the loading
    // state to true, clears any previous errors, and fetches the recent searches from the API.
    setError(null); // null is to clear the error state

    try {
      const response = await fetch("/api/weather", { method: "GET" }); // Fetch recent searches from the API
      // Ensure the correct API endpoint

      if (!response.ok) {
        throw new Error("Failed to fetch recent searches. Please try again later."); // Throw an error if the response is not ok when fetching recent searches
      }

      const data = await response.json(); // Parse the response body as JSON data and store it in the data variable
      if (!data.length) { // Check if the data array is empty
        setError("No recent searches found."); //if it is empty, set an error message
      } else {
        setRecentSearches(data); //else, set the recent searches state with the data
      }
    } catch (err) { // Catch any errors that occur during the fetch request
      setError(err.message); // Set the error state with the error message
    } finally { // Finally block to set the loading state to false
      setLoading(false); // Set the loading state to false
    }
  };

  useEffect(() => { //this function is called when the component mounts to fetch the recent searches
    fetchRecentSearches(); // Call the fetchRecentSearches function
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
