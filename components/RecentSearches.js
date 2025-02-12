import React, { useEffect, useState } from 'react';
import { getRecentSearches } from '@/lib/search';  // Import the function to get recent searches

const RecentSearches = () => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const data = await getRecentSearches();
        setSearches(data);
      } catch (error) {
        console.error("Failed to fetch recent searches:", error);
      }
    };

    fetchSearches();
  }, []);

  return (
    <div>
      <h3>Recent Searches</h3>
      {searches.length > 0 ? (
        <ul>
          {searches.map((search, index) => (
            <li key={index}>
              {search.city}, {search.country}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent searches found.</p>
      )}
    </div>
  );
};

export default RecentSearches;
