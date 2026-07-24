/*
  Warnings:

  - Added the required column `proveedorId` to the `items` table without a default value. This is not possible if the table is not empty.
  - Made the column `unidadesPorPack` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "proveedorId" TEXT NOT NULL,
ALTER COLUMN "unidadesPorPack" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
