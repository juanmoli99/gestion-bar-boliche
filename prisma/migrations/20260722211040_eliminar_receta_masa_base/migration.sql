/*
  Warnings:

  - You are about to drop the `receta_masa_base` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receta_masa_base_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "receta_masa_base_items" DROP CONSTRAINT "receta_masa_base_items_itemId_fkey";

-- DropForeignKey
ALTER TABLE "receta_masa_base_items" DROP CONSTRAINT "receta_masa_base_items_recetaId_fkey";

-- DropTable
DROP TABLE "receta_masa_base";

-- DropTable
DROP TABLE "receta_masa_base_items";
