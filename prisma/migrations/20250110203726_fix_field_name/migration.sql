/*
  Warnings:

  - You are about to drop the column `imagemUrl` on the `PortfolioItem` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `PortfolioItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioItem" DROP COLUMN "imagemUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
