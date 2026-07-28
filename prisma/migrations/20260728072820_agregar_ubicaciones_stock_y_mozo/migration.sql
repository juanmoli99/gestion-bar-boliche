-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "cantidadDeposito" DECIMAL(12,3) NOT NULL DEFAULT 0,
ADD COLUMN     "cantidadSalon" DECIMAL(12,3) NOT NULL DEFAULT 0;
