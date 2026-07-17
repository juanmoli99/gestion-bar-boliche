-- CreateEnum
CREATE TYPE "ModalidadFiesta" AS ENUM ('BARRA_LIBRE', 'COCTELERIA');

-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "modalidadFiesta" "ModalidadFiesta";
