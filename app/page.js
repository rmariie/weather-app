"use client";

import React, { useState } from "react";
import WeatherForm from "@/components/WeatherForm"; //importing the WeatherForm component
import WeatherDisplay from "@/components/WeatherDisplay"; //importing the WeatherDisplay component
import RecentSearches from "@/components/RecentSearches"; //importing the RecentSearches component
// we import all of those bc we want to use them in the Home component
export default function Home() { //this is the Home component that is exported to be used in other files
  const [city, setCity] = useState(""); //we are using the useState hook to create a state variable called city and a function called setCity to update the city
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Fetch weather data
  const fetchWeather = async () => { //an arrow function that is used to fetch the weather data from the OpenWeather API
    if (!city.trim()) { //if the city is empty or contains only whitespace(a func that checks for white space)
      setError("City cannot be empty");
      return;
    }

    setLoading(true); //set loading is used to set the loading state to true we beed this bc we want to show a loading message to the user while the data is being fetched
    setError(null); //and this is used to set the error state to null so that we can clear any previous error messages

    try {
      const response = await fetch("/api/weather", { //here we are fetching the weather data from the API endpoint
        method: "POST", //we are using the POST method to send the request to the API endpoint
        // a POST method is used to send data to the server
        // the data is sent in the request body
        // the POST method is used to create a new resource on the server
        headers: { //here we are setting the headers of the request headers are used to provide additional information about the request
          "Content-Type": "application/json", //the Content-Type header specifies the type of data in the request body
        },
        body: JSON.stringify({ city, country }), //here we are sending the city and country in the request body as JSON data
        //a json is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate
        //JSON.stringify() is used to convert a JavaScript object into a JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        // if the response is nit ok then we are getting the error data from the response
        throw new Error(errorData.error || "Something went wrong"); //then we add a bew error message to the error state
      }

      const data = await response.json(); //creating a new variable called data and getting the weather data from the response
      //the weather data contains information about the weather in the specified city
      setWeatherData(data); //then we set the weather data to the data variable that we created
      setCity(""); //then we clear the city and country state variables
      setError(null); //and we set the error state to null
    } catch (err) { //err is the error object that is thrown in the try block
      setWeatherData(null); // this is used to set the weather data to null bc we want to clear the weather data if there is an error
      setError(err.message); //this is used to set the error state to the error message that was thrown
    } finally { //the finally block is used to execute code after the try and catch blocks
      setLoading(false); //this is used to set the loading state to false so that we can stop showing the loading message
    }
  };

  return ( //just describing the UI of the page which iks responsible for rendering the WeatherForm, WeatherDisplay, and RecentSearches components
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
