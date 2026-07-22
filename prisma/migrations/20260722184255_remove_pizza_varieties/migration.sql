/*
  Warnings:

  - You are about to drop the column `itemPizzaSinTaccId` on the `configuracion_produccion_pizza` table. All the data in the column will be lost.
  - You are about to drop the column `pizzasSinTaccPorPersona` on the `formulas_cocina` table. All the data in the column will be lost.
  - You are about to drop the `formulas_cocina_variedades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variedades_pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variedades_pizza_ingredientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "configuracion_produccion_pizza" DROP CONSTRAINT "configuracion_produccion_pizza_itemPizzaSinTaccId_fkey";

-- DropForeignKey
ALTER TABLE "formulas_cocina_variedades" DROP CONSTRAINT "formulas_cocina_variedades_formulaCocinaId_fkey";

-- DropForeignKey
ALTER TABLE "formulas_cocina_variedades" DROP CONSTRAINT "formulas_cocina_variedades_variedadPizzaId_fkey";

-- DropForeignKey
ALTER TABLE "variedades_pizza_ingredientes" DROP CONSTRAINT "variedades_pizza_ingredientes_itemId_fkey";

-- DropForeignKey
ALTER TABLE "variedades_pizza_ingredientes" DROP CONSTRAINT "variedades_pizza_ingredientes_variedadId_fkey";

-- DropIndex
DROP INDEX "configuracion_produccion_pizza_itemPizzaSinTaccId_key";

-- AlterTable
ALTER TABLE "configuracion_produccion_pizza" DROP COLUMN "itemPizzaSinTaccId";

-- AlterTable
ALTER TABLE "formulas_cocina" DROP COLUMN "pizzasSinTaccPorPersona",
ADD COLUMN     "descripcion" TEXT;

-- DropTable
DROP TABLE "formulas_cocina_variedades";

-- DropTable
DROP TABLE "variedades_pizza";

-- DropTable
DROP TABLE "variedades_pizza_ingredientes";

-- CreateTable
CREATE TABLE "formulas_cocina_items" (
    "id" TEXT NOT NULL,
    "formulaCocinaId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadPorPersona" DECIMAL(12,4) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formulas_cocina_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "formulas_cocina_items_formulaCocinaId_idx" ON "formulas_cocina_items"("formulaCocinaId");

-- CreateIndex
CREATE INDEX "formulas_cocina_items_itemId_idx" ON "formulas_cocina_items"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "formulas_cocina_items_formulaCocinaId_itemId_key" ON "formulas_cocina_items"("formulaCocinaId", "itemId");

-- AddForeignKey
ALTER TABLE "formulas_cocina_items" ADD CONSTRAINT "formulas_cocina_items_formulaCocinaId_fkey" FOREIGN KEY ("formulaCocinaId") REFERENCES "formulas_cocina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_cocina_items" ADD CONSTRAINT "formulas_cocina_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
