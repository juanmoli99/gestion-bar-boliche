/*
  Warnings:

  - You are about to drop the column `nombre` on the `proveedores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cuit]` on the table `proveedores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cuit` to the `proveedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razonSocial` to the `proveedores` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "proveedores_nombre_idx";

-- AlterTable
ALTER TABLE "proveedores" DROP COLUMN "nombre",
ADD COLUMN     "ciudad" TEXT,
ADD COLUMN     "codigoPostal" TEXT,
ADD COLUMN     "cuit" TEXT NOT NULL,
ADD COLUMN     "nombreComercial" TEXT,
ADD COLUMN     "provincia" TEXT,
ADD COLUMN     "razonSocial" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "proveedores_cuit_key" ON "proveedores"("cuit");
