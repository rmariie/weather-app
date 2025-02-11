import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const apiKey = process.env.OPENWEATHER_API_KEY; // Your OpenWeatherMap API key

export const fetchWeatherData = async (city: string, country: string) => {
  if (!city || !country) {
    throw new Error("City and country are required");
  }

  // Construct the correct API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(apiUrl);
    const body = await response.text(); // Get raw response body as text

    // Log the body of the response for debugging
    console.log("Response Body:", body);

    // If the response is not OK, return the error message
    if (!response.ok) {
      throw new Error(body);
    }

    // Attempt to parse the body as JSON
    const weatherData = JSON.parse(body);

    // Save the search to the database
    await prisma.weatherSearch.create({
      data: { city, country },
    });

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { city, country } = req.body;

    try {
      const weatherData = await fetchWeatherData(city, country);
      return res.status(200).json(weatherData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
