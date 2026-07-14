/*
  Warnings:

  - You are about to drop the `detalles_formulas_compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "detalles_formulas_compra" DROP CONSTRAINT "detalles_formulas_compra_formulaId_fkey";

-- DropForeignKey
ALTER TABLE "detalles_formulas_compra" DROP CONSTRAINT "detalles_formulas_compra_itemId_fkey";

-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "formulaVersionId" TEXT;

-- DropTable
DROP TABLE "detalles_formulas_compra";

-- CreateTable
CREATE TABLE "formulas_versiones" (
    "id" TEXT NOT NULL,
    "formulaId" TEXT NOT NULL,
    "numeroVersion" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "formulas_versiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formulas_versiones_items" (
    "id" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadPorPersona" DECIMAL(12,4) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formulas_versiones_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "formulas_versiones_formulaId_idx" ON "formulas_versiones"("formulaId");

-- CreateIndex
CREATE UNIQUE INDEX "formulas_versiones_formulaId_numeroVersion_key" ON "formulas_versiones"("formulaId", "numeroVersion");

-- CreateIndex
CREATE INDEX "formulas_versiones_items_versionId_idx" ON "formulas_versiones_items"("versionId");

-- CreateIndex
CREATE INDEX "formulas_versiones_items_itemId_idx" ON "formulas_versiones_items"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "formulas_versiones_items_versionId_itemId_key" ON "formulas_versiones_items"("versionId", "itemId");

-- CreateIndex
CREATE INDEX "reservas_formulaVersionId_idx" ON "reservas"("formulaVersionId");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_formulaVersionId_fkey" FOREIGN KEY ("formulaVersionId") REFERENCES "formulas_versiones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_versiones" ADD CONSTRAINT "formulas_versiones_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "formulas_compra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_versiones_items" ADD CONSTRAINT "formulas_versiones_items_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "formulas_versiones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_versiones_items" ADD CONSTRAINT "formulas_versiones_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
