/*
  Warnings:

  - You are about to drop the column `integrationTestCommand` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "integrationTestCommand",
ADD COLUMN     "dockerComposeIntegrationTestServiceName" TEXT,
ADD COLUMN     "dockerComposeServiceName" TEXT,
ADD COLUMN     "githubIntegrationTestRepoUrl" TEXT;
