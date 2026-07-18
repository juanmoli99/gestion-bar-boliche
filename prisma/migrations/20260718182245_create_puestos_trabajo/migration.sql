-- CreateTable
CREATE TABLE "puestos_trabajo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorHora" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puestos_trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "puestos_trabajo_nombre_key" ON "puestos_trabajo"("nombre");
