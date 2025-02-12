import prisma from "@/utils/db";

// Fetch recent weather searches
export const getRecentSearches = async () => {
  return await prisma.weatherSearch.findMany({
    orderBy: { createdAt: "desc" },
    take: 5, // Limit to 5 most recent searches
  });
}
