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

    // Log the raw response body for debugging
    const responseText = await response.text();
    console.log("Raw Response:", responseText);  // Log the raw text response

    // Try to parse the JSON from the response
    if (!response.ok) {
      const errorData = JSON.parse(responseText);  // Use the raw response for parsing
      throw new Error(errorData.error || "Something went wrong");
    }

    // Parse the response if valid
    const data = JSON.parse(responseText); // Manually parse the response text
    setWeatherData(data);
    setError(null);
  } catch (err) {
    setWeatherData(null);
    setError(err.message);  // Display any error
  } finally {
    setLoading(false);
  }
};
