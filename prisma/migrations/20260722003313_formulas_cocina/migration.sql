-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "formulaCocinaId" TEXT;

-- CreateTable
CREATE TABLE "formulas_cocina" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "pizzasNormalesPorPersona" DECIMAL(12,4) NOT NULL,
    "pizzasSinTaccPorPersona" DECIMAL(12,4) NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formulas_cocina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receta_masa_base" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receta_masa_base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receta_masa_base_items" (
    "id" TEXT NOT NULL,
    "recetaId" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadPorPizza" DECIMAL(12,4) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receta_masa_base_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variedades_pizza" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variedades_pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variedades_pizza_ingredientes" (
    "id" TEXT NOT NULL,
    "variedadId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadPorPizza" DECIMAL(12,4) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "variedades_pizza_ingredientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formulas_cocina_variedades" (
    "id" TEXT NOT NULL,
    "formulaCocinaId" TEXT NOT NULL,
    "variedadPizzaId" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "formulas_cocina_variedades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracion_produccion_pizza" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "itemPizzaElaboradaId" TEXT,
    "itemPizzaSinTaccId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracion_produccion_pizza_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "formulas_cocina_nombre_key" ON "formulas_cocina"("nombre");

-- CreateIndex
CREATE INDEX "receta_masa_base_items_recetaId_idx" ON "receta_masa_base_items"("recetaId");

-- CreateIndex
CREATE INDEX "receta_masa_base_items_itemId_idx" ON "receta_masa_base_items"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "receta_masa_base_items_recetaId_itemId_key" ON "receta_masa_base_items"("recetaId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "variedades_pizza_nombre_key" ON "variedades_pizza"("nombre");

-- CreateIndex
CREATE INDEX "variedades_pizza_ingredientes_variedadId_idx" ON "variedades_pizza_ingredientes"("variedadId");

-- CreateIndex
CREATE INDEX "variedades_pizza_ingredientes_itemId_idx" ON "variedades_pizza_ingredientes"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "variedades_pizza_ingredientes_variedadId_itemId_key" ON "variedades_pizza_ingredientes"("variedadId", "itemId");

-- CreateIndex
CREATE INDEX "formulas_cocina_variedades_formulaCocinaId_idx" ON "formulas_cocina_variedades"("formulaCocinaId");

-- CreateIndex
CREATE INDEX "formulas_cocina_variedades_variedadPizzaId_idx" ON "formulas_cocina_variedades"("variedadPizzaId");

-- CreateIndex
CREATE UNIQUE INDEX "formulas_cocina_variedades_formulaCocinaId_variedadPizzaId_key" ON "formulas_cocina_variedades"("formulaCocinaId", "variedadPizzaId");

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_produccion_pizza_itemPizzaElaboradaId_key" ON "configuracion_produccion_pizza"("itemPizzaElaboradaId");

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_produccion_pizza_itemPizzaSinTaccId_key" ON "configuracion_produccion_pizza"("itemPizzaSinTaccId");

-- CreateIndex
CREATE INDEX "reservas_formulaCocinaId_idx" ON "reservas"("formulaCocinaId");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_formulaCocinaId_fkey" FOREIGN KEY ("formulaCocinaId") REFERENCES "formulas_cocina"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receta_masa_base_items" ADD CONSTRAINT "receta_masa_base_items_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "receta_masa_base"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receta_masa_base_items" ADD CONSTRAINT "receta_masa_base_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variedades_pizza_ingredientes" ADD CONSTRAINT "variedades_pizza_ingredientes_variedadId_fkey" FOREIGN KEY ("variedadId") REFERENCES "variedades_pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variedades_pizza_ingredientes" ADD CONSTRAINT "variedades_pizza_ingredientes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_cocina_variedades" ADD CONSTRAINT "formulas_cocina_variedades_formulaCocinaId_fkey" FOREIGN KEY ("formulaCocinaId") REFERENCES "formulas_cocina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formulas_cocina_variedades" ADD CONSTRAINT "formulas_cocina_variedades_variedadPizzaId_fkey" FOREIGN KEY ("variedadPizzaId") REFERENCES "variedades_pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracion_produccion_pizza" ADD CONSTRAINT "configuracion_produccion_pizza_itemPizzaElaboradaId_fkey" FOREIGN KEY ("itemPizzaElaboradaId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracion_produccion_pizza" ADD CONSTRAINT "configuracion_produccion_pizza_itemPizzaSinTaccId_fkey" FOREIGN KEY ("itemPizzaSinTaccId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
