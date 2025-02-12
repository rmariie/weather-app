import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const apiKey = "your-openweather-api-key";

// Handle POST request to fetch weather data
export async function POST(request) {
  try {
    const { city, country } = await request.json();

    if (!city.trim() || !country.trim()) {
      return NextResponse.json({ error: "Both city and country fields are required." }, { status: 400 });
    }

    // Fetch weather data from OpenWeather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    );

    const weatherData = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: weatherData.message }, { status: 400 });
    }

    // Save the search to the database
    await prisma.weatherSearch.create({
      data: { city, country },
    });

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}

// Handle GET request to fetch recent weather searches
export async function GET() {
  try {
    // Fetch the 5 most recent weather searches
    const searches = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: "desc" },
      take: 5, // Limit to 5 most recent
    });

    return NextResponse.json(searches, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Failed to retrieve data" }, { status: 500 });
  }
}
