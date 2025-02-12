import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

const apiKey = "9fa59f2bc24d18b96196511ef37f74f1";

// Handle POST requests
export async function POST(request) {
  try {
    const { city, country = "" } = await request.json();

    if (!city.trim()) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    );
    const weatherData = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: weatherData.message }, { status: 400 });
    }

    await prisma.weatherSearch.create({
      data: { city, country },
    });

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  try {
    const searches = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json(searches, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
