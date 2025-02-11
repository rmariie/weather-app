export async function POST(request) {
  try {
    const { city, country = "" } = await request.json(); // Parse JSON body

    if (!city.trim()) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }

    // Fetch weather data from OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    );

    const weatherData = await response.json();

    if (!response.ok) {
      console.error("OpenWeather API error:", weatherData);  // Log the error from the weather API
      return NextResponse.json({ error: weatherData.message }, { status: 400 });
    }

    // Save the search to the database using the utility function
    await saveSearch(city, country);

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
