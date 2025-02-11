import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Save a weather search to the database.
 * @param {string} city - The name of the city.
 * @param {string} country - The name of the country.
 */
export async function saveSearch(city, country) {
  try {
    // Saving the weather search in the database
    await prisma.weatherSearch.create({
      data: { city, country },
    });
  } catch (error) {
    console.error("Error saving search to the database:", error);
    throw new Error("Failed to save search");
  }
}

/**
 * Get the 10 most recent weather searches from the database.
 * @returns {Promise<Array>} - An array of recent searches or a message if no data exists.
 */
export async function getRecentSearches() {
  try {
    const count = await prisma.weatherSearch.count();  // Check if there are any records

    if (count === 0) {
      return { message: "No recent searches found." };  // Return a message if no data exists
    }

    // Fetching the 10 most recent weather searches
    const searches = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: "desc" },
      take: 10, // Limit to the 10 most recent
    });

    return searches;
  } catch (error) {
    console.error("Error retrieving searches from the database:", error);
    throw new Error("Failed to retrieve recent searches");
  }
}
const user = await prisma.user.create({
    data: {
      city: 'london',
      country:'england',
    },
  })