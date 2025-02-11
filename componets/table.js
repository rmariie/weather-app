// // components/Table.js
// import React, { useEffect, useState } from "react";

// export default function Table() {
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecentSearches = async () => {
//       try {
//         const response = await fetch("/api/recently-searched"); // Your API route
//         const data = await response.json();

//         if (response.ok) {
//           setRecentSearches(data); // Set recent searches data
//         } else {
//           setError(data.error || "Failed to fetch recent searches");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching recent searches.");
//       }
//     };

//     fetchRecentSearches();
//   }, []);

//   return (
//     <div>
//       <h2>Recently Searched Cities</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {recentSearches.length > 0 ? (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>City</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Country</th>
//               <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentSearches.map((search, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   {search.city}
//                 </td>
//                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   {search.country}
//                 </td>
//                 <td style={{ border: "1px solid #ccc", padding: "8px" }}>
//                   {new Date(search.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No recent searches available.</p>
//       )}
//     </div>
//   );
// }
