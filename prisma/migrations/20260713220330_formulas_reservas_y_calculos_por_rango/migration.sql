/*
  Warnings:

  - The values [TRANSFERENCIA_ENTRADA,TRANSFERENCIA_SALIDA] on the enum `TipoMovimientoStock` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cantidadPersonas` on the `calculos_compra_fiesta` table. All the data in the column will be lost.
  - You are about to drop the column `formulaId` on the `calculos_compra_fiesta` table. All the data in the column will be lost.
  - You are about to drop the column `reservaId` on the `calculos_compra_fiesta` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadComprada` on the `detalles_calculos_compra` table. All the data in the column will be lost.
  - You are about to drop the column `unidadesPorPack` on the `detalles_calculos_compra` table. All the data in the column will be lost.
  - You are about to alter the column `cantidadPacksCalculada` on the `detalles_calculos_compra` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,3)` to `Integer`.
  - You are about to drop the column `cantidadReferencia` on the `detalles_formulas_compra` table. All the data in the column will be lost.
  - You are about to drop the column `personasReferencia` on the `detalles_formulas_compra` table. All the data in the column will be lost.
  - You are about to drop the column `unidadesPorPack` on the `detalles_formulas_compra` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[calculoId,reservaId,itemId]` on the table `detalles_calculos_compra` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fechaDesde` to the `calculos_compra_fiesta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaHasta` to the `calculos_compra_fiesta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `detalles_calculos_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservaId` to the `detalles_calculos_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadPorPersona` to the `detalles_formulas_compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoMovimientoStock_new" AS ENUM ('ENTRADA', 'SALIDA', 'AJUSTE_POSITIVO', 'AJUSTE_NEGATIVO');
ALTER TABLE "movimientos_stock" ALTER COLUMN "tipo" TYPE "TipoMovimientoStock_new" USING ("tipo"::text::"TipoMovimientoStock_new");
ALTER TYPE "TipoMovimientoStock" RENAME TO "TipoMovimientoStock_old";
ALTER TYPE "TipoMovimientoStock_new" RENAME TO "TipoMovimientoStock";
DROP TYPE "public"."TipoMovimientoStock_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "calculos_compra_fiesta" DROP CONSTRAINT "calculos_compra_fiesta_formulaId_fkey";

-- DropForeignKey
ALTER TABLE "calculos_compra_fiesta" DROP CONSTRAINT "calculos_compra_fiesta_reservaId_fkey";

-- DropIndex
DROP INDEX "calculos_compra_fiesta_formulaId_idx";

-- DropIndex
DROP INDEX "calculos_compra_fiesta_reservaId_idx";

-- DropIndex
DROP INDEX "detalles_calculos_compra_calculoId_itemId_key";

-- AlterTable
ALTER TABLE "calculos_compra_fiesta" DROP COLUMN "cantidadPersonas",
DROP COLUMN "formulaId",
DROP COLUMN "reservaId",
ADD COLUMN     "cantidadPersonasTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fechaDesde" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaHasta" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "detalles_calculos_compra" DROP COLUMN "cantidadComprada",
DROP COLUMN "unidadesPorPack",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reservaId" TEXT NOT NULL,
ALTER COLUMN "cantidadPacksCalculada" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "detalles_formulas_compra" DROP COLUMN "cantidadReferencia",
DROP COLUMN "personasReferencia",
DROP COLUMN "unidadesPorPack",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cantidadPorPersona" DECIMAL(12,4) NOT NULL;

-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "formulaId" TEXT;

-- CreateTable
CREATE TABLE "calculos_compra_reservas" (
    "id" TEXT NOT NULL,
    "calculoId" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "cantidadPersonas" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calculos_compra_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "calculos_compra_reservas_calculoId_idx" ON "calculos_compra_reservas"("calculoId");

-- CreateIndex
CREATE INDEX "calculos_compra_reservas_reservaId_idx" ON "calculos_compra_reservas"("reservaId");

-- CreateIndex
CREATE UNIQUE INDEX "calculos_compra_reservas_calculoId_reservaId_key" ON "calculos_compra_reservas"("calculoId", "reservaId");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_fechaDesde_idx" ON "calculos_compra_fiesta"("fechaDesde");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_fechaHasta_idx" ON "calculos_compra_fiesta"("fechaHasta");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_usuarioId_idx" ON "calculos_compra_fiesta"("usuarioId");

-- CreateIndex
CREATE INDEX "detalles_calculos_compra_calculoId_idx" ON "detalles_calculos_compra"("calculoId");

-- CreateIndex
CREATE INDEX "detalles_calculos_compra_reservaId_idx" ON "detalles_calculos_compra"("reservaId");

-- CreateIndex
CREATE INDEX "detalles_calculos_compra_fecha_idx" ON "detalles_calculos_compra"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "detalles_calculos_compra_calculoId_reservaId_itemId_key" ON "detalles_calculos_compra"("calculoId", "reservaId", "itemId");

-- CreateIndex
CREATE INDEX "detalles_formulas_compra_formulaId_idx" ON "detalles_formulas_compra"("formulaId");

-- CreateIndex
CREATE INDEX "reservas_formulaId_idx" ON "reservas"("formulaId");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "formulas_compra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_calculos_compra" ADD CONSTRAINT "detalles_calculos_compra_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculos_compra_reservas" ADD CONSTRAINT "calculos_compra_reservas_calculoId_fkey" FOREIGN KEY ("calculoId") REFERENCES "calculos_compra_fiesta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculos_compra_reservas" ADD CONSTRAINT "calculos_compra_reservas_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
