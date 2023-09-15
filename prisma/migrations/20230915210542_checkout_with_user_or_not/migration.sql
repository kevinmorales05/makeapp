/*
  Warnings:

  - Added the required column `hasUser` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Made the column `contact` on table `Checkout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_userId_fkey";

-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "hasUser" BOOLEAN NOT NULL,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
