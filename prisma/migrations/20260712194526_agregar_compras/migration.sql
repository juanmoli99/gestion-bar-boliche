/*
  Warnings:

  - The values [CANCELADA] on the enum `EstadoCompra` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fecha` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `inventario` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `compras` table. All the data in the column will be lost.
  - Made the column `proveedorId` on table `compras` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoCompra_new" AS ENUM ('BORRADOR', 'CONFIRMADA', 'ANULADA');
ALTER TABLE "public"."compras" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "compras" ALTER COLUMN "estado" TYPE "EstadoCompra_new" USING ("estado"::text::"EstadoCompra_new");
ALTER TYPE "EstadoCompra" RENAME TO "EstadoCompra_old";
ALTER TYPE "EstadoCompra_new" RENAME TO "EstadoCompra";
DROP TYPE "public"."EstadoCompra_old";
ALTER TABLE "compras" ALTER COLUMN "estado" SET DEFAULT 'BORRADOR';
COMMIT;

-- DropForeignKey
ALTER TABLE "compras" DROP CONSTRAINT "compras_proveedorId_fkey";

-- DropIndex
DROP INDEX "compras_fecha_idx";

-- DropIndex
DROP INDEX "compras_inventario_idx";

-- DropIndex
DROP INDEX "compras_proveedorId_idx";

-- AlterTable
ALTER TABLE "compras" DROP COLUMN "fecha",
DROP COLUMN "inventario",
DROP COLUMN "total",
ALTER COLUMN "proveedorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
