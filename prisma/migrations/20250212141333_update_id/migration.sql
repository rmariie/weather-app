/*
  Warnings:

  - The primary key for the `WeatherSearch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `WeatherSearch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WeatherSearch" DROP CONSTRAINT "WeatherSearch_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WeatherSearch_pkey" PRIMARY KEY ("id");
