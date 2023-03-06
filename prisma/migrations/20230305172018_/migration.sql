/*
  Warnings:

  - The values [LOG] on the enum `ResourceType` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMMIT] on the enum `TriggerType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lastRunAt` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `githubRepository` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `testCommand` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `triggerOnCommit` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `containerId` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubRepoUrl` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `dockerfilePath` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResourceType_new" AS ENUM ('PIPELINE', 'SERVICE', 'RUN', 'STAGE', 'OTHER');
ALTER TABLE "EnvironmentVariable" ALTER COLUMN "resourceType" TYPE "ResourceType_new" USING ("resourceType"::text::"ResourceType_new");
ALTER TYPE "ResourceType" RENAME TO "ResourceType_old";
ALTER TYPE "ResourceType_new" RENAME TO "ResourceType";
DROP TYPE "ResourceType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TriggerType_new" AS ENUM ('MAIN', 'PR_OPEN', 'PR_SYNC');
ALTER TABLE "Run" ALTER COLUMN "triggerType" TYPE "TriggerType_new" USING ("triggerType"::text::"TriggerType_new");
ALTER TYPE "TriggerType" RENAME TO "TriggerType_old";
ALTER TYPE "TriggerType_new" RENAME TO "TriggerType";
DROP TYPE "TriggerType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_stageId_fkey";

-- AlterTable
ALTER TABLE "Pipeline" DROP COLUMN "lastRunAt";

-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "githubRepository",
DROP COLUMN "testCommand",
DROP COLUMN "triggerOnCommit",
ADD COLUMN     "autoDeploy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dockerComposeFilePath" TEXT,
ADD COLUMN     "githubRepoUrl" TEXT NOT NULL,
ADD COLUMN     "integrationTestCommand" TEXT,
ADD COLUMN     "lastRunAt" TIMESTAMP(3),
ADD COLUMN     "triggerOnMain" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unitTestCommand" TEXT,
ALTER COLUMN "dockerfilePath" SET NOT NULL,
ALTER COLUMN "dockerfilePath" SET DEFAULT '.';

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "containerId",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startedAt" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'IDLE',
ALTER COLUMN "type" DROP DEFAULT;

-- DropTable
DROP TABLE "Log";
