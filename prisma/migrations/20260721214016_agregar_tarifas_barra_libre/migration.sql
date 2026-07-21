-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "tarifaBarraLibreId" TEXT;

-- CreateTable
CREATE TABLE "tarifas_barra_libre" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorPersona" DECIMAL(14,2) NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarifas_barra_libre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tarifas_barra_libre_nombre_key" ON "tarifas_barra_libre"("nombre");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_tarifaBarraLibreId_fkey" FOREIGN KEY ("tarifaBarraLibreId") REFERENCES "tarifas_barra_libre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
