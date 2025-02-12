export async function GET() {
    try {
      const searches = await prisma.weatherSearch.findMany({
        orderBy: { createdAt: "desc" },
        take: 5, // Limit to 5 most recent
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
  