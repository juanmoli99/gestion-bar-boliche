-- CreateTable
CREATE TABLE "historial_costos_items" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "compraId" TEXT,
    "costoAnterior" DECIMAL(14,2) NOT NULL,
    "costoNuevo" DECIMAL(14,2) NOT NULL,
    "stockAnterior" DECIMAL(14,3) NOT NULL,
    "stockNuevo" DECIMAL(14,3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_costos_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "historial_costos_items_itemId_idx" ON "historial_costos_items"("itemId");

-- CreateIndex
CREATE INDEX "historial_costos_items_compraId_idx" ON "historial_costos_items"("compraId");

-- AddForeignKey
ALTER TABLE "historial_costos_items" ADD CONSTRAINT "historial_costos_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_costos_items" ADD CONSTRAINT "historial_costos_items_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
