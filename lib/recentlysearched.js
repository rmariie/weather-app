import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Save a weather search to the database.
 * @param {string} city - The name of the city.
 * @param {string} country - The name of the country.
 */
export async function saveSearch(city, country) {
  try {
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
 * @returns {Promise<Array>} - An array of recent searches.
 */
export async function getRecentSearches() {
  try {
    const searches = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return searches;
  } catch (error) {
    console.error("Error retrieving searches from the database:", error);
    throw new Error("Failed to retrieve recent searches");
  }
}
