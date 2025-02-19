//Handles the input fields and form submission.
//this page is meant to be a reusable component that can be used in other pages.
//It takes in the city, country, setCity, setCountry, and fetchWeather functions as props.
"use client";

export default function WeatherForm({ city, country, setCity, setCountry, fetchWeather }) {
  return (
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
  );
}
