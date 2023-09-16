/*
  Warnings:

  - Added the required column `orderNumber` to the `Checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderTotal` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "changeHistory" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "orderTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
