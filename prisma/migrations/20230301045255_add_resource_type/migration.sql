/*
  Warnings:

  - Changed the type of `resourceType` on the `EnvironmentVariable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PIPELINE', 'SERVICE', 'RUN', 'STAGE', 'LOG');

-- AlterTable
ALTER TABLE "EnvironmentVariable" DROP COLUMN "resourceType",
ADD COLUMN     "resourceType" "ResourceType" NOT NULL;
