// in route.js we will be creating the API routes for fetching and saving weather data
//this will be responsible for handling the POST and GET requests to the /api/weather endpoint and interacting with the database

import { PrismaClient } from "@prisma/client"; // this is used to interact with the database
import { NextResponse } from "next/server"; // this is used to send responses to the client

const prisma = new PrismaClient(); // here we are creating a new instance of the Prisma client
const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // here we are getting the OpenWeather API key from the environment variables

// Handle POST requests to fetch weather data and save it to the database
export async function POST(request) { //this function is used to handle POST requests
  try {
    const { city, country = "" } = await request.json(); // here we are getting the city and country from the request body
// how does request work? simple, it is a parameter that is passed to the function that contains the request object
// the request object contains the request body, headers, method, and other information about the request
// the request object is passed to the function as a parameter
    if (!city.trim()) { //if the city is empty or contains only whitespace
      return NextResponse.json({ error: "City is required." }, { status: 400 }); //return an error response
      //400 is the status code for a bad request or invalid input
    }

    // Fetch weather data from OpenWeather API
    const response = await fetch( //here we are fetching the weather data from the OpenWeather API
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    );

    const weatherData = await response.json(); //here we are getting the weather data from the response
    //the weather data contains information about the weather in the specified city
    //we need this bc we want to save the weather data to the database

    if (!response.ok) { //if the response is not ok which means there was an error or the city was not found or the API key is invalid
      return NextResponse.json({ error: weatherData.message }, { status: 400 }); //return an error response
      //400 is the status code for a bad request or invalid input
    }

    // Save the weather search to the database
    await prisma.weatherSearch.create({ //here we are saving the weather search to the database
      data: { //here we are creating a new weather search record in the database an array of objects
        city: weatherData.name, //the city name from the weather data response
        country: weatherData.sys.country, //the country code from the weather data response
        //sys is an object in the weather data response that contains information about the country
        //country is the country code of the country where the city is located
        
      },
    });

    return NextResponse.json(weatherData, { status: 200 }); //return the weather data as a response
    //200 is the status code for a successful
      
  } catch (error) { //if there is an error in the try block then the catch block will catch the error
    console.error("Error in POST handler:", error); //log the error to the console for debugging
    return NextResponse.json( //return an error response to the client
      { error: "Failed to fetch or save weather data." }, //the error message
      { status: 500 } //500 is the status code for an internal server error 
    );
  }
}

// Handle GET requests to retrieve recent searches from the database
export async function GET() { //this function is used to handle GET requests to retrieve recent searches from the database
  try {
    const searches = await prisma.weatherSearch.findMany({ //here we are fetching the recent searches from the database
      //findMany is a Prisma query that retrieves multiple records from the database
      //it returns an array of objects that match the specified criteria also known as a filter
      orderBy: { createdAt: "desc" }, //here we are ordering the searches by the createdAt field in descending order
      take: 10, //10 recent searches to retrieve
    });

    return NextResponse.json(searches, { status: 200 }); //return the recent searches as a response
  } catch (error) {
    console.error("Error in GET handler:", error); //log the error to the console for debugging (just a print statement)
    return NextResponse.json( //return an error response to the client 
      { error: "Failed to retrieve recent searches." },
      { status: 500 }
    );
  }
}
