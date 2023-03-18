/*
  Warnings:

  - You are about to drop the column `awsAccessKey` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `awsSecretAccessKey` on the `Pipeline` table. All the data in the column will be lost.
  - You are about to drop the column `githubPat` on the `Pipeline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pipeline" DROP COLUMN "awsAccessKey",
DROP COLUMN "awsSecretAccessKey",
DROP COLUMN "githubPat",
ADD COLUMN     "githubClientId" TEXT,
ADD COLUMN     "githubClientSecret" TEXT,
ADD COLUMN     "githubOauthToken" TEXT;
