-- CreateTable
CREATE TABLE "valores" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "pizzaLibreGeneral" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "pizzaLibreViernes" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "pizzaLibreSabado" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "menuSinTacc" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "fiestaBarraLibrePorPersona" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "valores_pkey" PRIMARY KEY ("id")
);
