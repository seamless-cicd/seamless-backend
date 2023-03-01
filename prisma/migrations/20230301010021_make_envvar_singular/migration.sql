/*
  Warnings:

  - You are about to drop the `EnvironmentVariables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EnvironmentVariables";

-- CreateTable
CREATE TABLE "EnvironmentVariable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,

    CONSTRAINT "EnvironmentVariable_pkey" PRIMARY KEY ("id")
);
