-- DropForeignKey
ALTER TABLE "StockHistory" DROP CONSTRAINT "StockHistory_productId_fkey";

-- AddForeignKey
ALTER TABLE "StockHistory" ADD CONSTRAINT "StockHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
