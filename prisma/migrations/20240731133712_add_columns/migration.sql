/*
  Warnings:

  - You are about to drop the column `password` on the `establishment` table. All the data in the column will be lost.
  - Added the required column `address` to the `establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "establishment" DROP COLUMN "password",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
