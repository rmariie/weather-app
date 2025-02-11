import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const apiKey = process.env.OPENWEATHER_API_KEY;

// Handle POST requests
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
      return NextResponse.json({ error: weatherData.message }, { status: 400 });
    }

    // Save the search to the database
    await prisma.weatherSearch.create({
      data: { city, country },
    });

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  try {
    // Fetch the 10 most recent weather searches
    const searches = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json(searches, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
