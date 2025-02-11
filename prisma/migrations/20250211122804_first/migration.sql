-- CreateTable
CREATE TABLE "WeatherSearch" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeatherSearch_pkey" PRIMARY KEY ("id")
);
