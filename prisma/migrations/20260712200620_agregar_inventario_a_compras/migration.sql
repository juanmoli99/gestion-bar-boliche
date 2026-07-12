/*
  Warnings:

  - Added the required column `inventario` to the `compras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compras" ADD COLUMN     "inventario" "TipoInventario" NOT NULL;
