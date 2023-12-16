/*
  Warnings:

  - You are about to drop the column `cep` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cep",
ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "situation" TEXT DEFAULT 'Irregular',
ADD COLUMN     "spouse" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "terrain" TEXT,
ADD COLUMN     "zip" TEXT;
