/*
  Warnings:

  - You are about to drop the column `githubRepoBranch` on the `Run` table. All the data in the column will be lost.
  - Added the required column `awsEcsCluster` to the `Pipeline` table without a default value. This is not possible if the table is not empty.
  - Made the column `githubClientId` on table `Pipeline` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubClientSecret` on table `Pipeline` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `awsEcsService` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pipeline" ADD COLUMN     "awsEcsCluster" TEXT NOT NULL,
ADD COLUMN     "awsEcsClusterStaging" TEXT,
ALTER COLUMN "githubClientId" SET NOT NULL,
ALTER COLUMN "githubClientSecret" SET NOT NULL;

-- AlterTable
ALTER TABLE "Run" DROP COLUMN "githubRepoBranch";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "awsEcsService" TEXT NOT NULL,
ADD COLUMN     "awsEcsServiceStaging" TEXT;
