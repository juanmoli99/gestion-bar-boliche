/*
  Warnings:

  - You are about to drop the `detalles_compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "detalles_compra" DROP CONSTRAINT "detalles_compra_compraId_fkey";

-- DropForeignKey
ALTER TABLE "detalles_compra" DROP CONSTRAINT "detalles_compra_itemId_fkey";

-- DropTable
DROP TABLE "detalles_compra";

-- CreateTable
CREATE TABLE "compras_detalle" (
    "id" TEXT NOT NULL,
    "compraId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidad" DECIMAL(12,3) NOT NULL,
    "precioUnitario" DECIMAL(12,2) NOT NULL,
    "porcentajeDescuento" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "porcentajeIva" DECIMAL(5,2) NOT NULL DEFAULT 21,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compras_detalle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compras_detalle" ADD CONSTRAINT "compras_detalle_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras_detalle" ADD CONSTRAINT "compras_detalle_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
