/*
  Warnings:

  - You are about to drop the column `awsFargateCluster` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `awsEcrRepository` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `awsFargateService` on the `Service` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'OTHER';

-- AlterEnum
ALTER TYPE "StageType" ADD VALUE 'OTHER';

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'IDLE';

-- AlterTable
ALTER TABLE "Pipeline" DROP COLUMN "awsFargateCluster";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "awsEcrRepository",
DROP COLUMN "awsFargateService";
