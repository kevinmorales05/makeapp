-- CreateTable
CREATE TABLE "Checkout" (
    "id" SERIAL NOT NULL,
    "contact" JSONB,
    "deliveryMethods" TEXT NOT NULL,
    "deliveryShip" JSONB,
    "deliveryPickup" JSONB,
    "items" JSONB NOT NULL,
    "methodPayment" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
