-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('drink', 'food');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInput" TEXT NOT NULL,
    "predictedAction" TEXT NOT NULL,
    "actualAction" TEXT NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "notes" TEXT,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "table" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "block" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "variant" TEXT,
    "flavor" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCustomization" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ItemCustomization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCustomization" ADD CONSTRAINT "ItemCustomization_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
