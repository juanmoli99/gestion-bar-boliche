-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMINISTRADOR', 'OPERADOR');

-- CreateEnum
CREATE TYPE "TipoInventario" AS ENUM ('BAR', 'BOLICHE');

-- CreateEnum
CREATE TYPE "TipoItem" AS ENUM ('PRODUCTO', 'INSUMO');

-- CreateEnum
CREATE TYPE "TipoMovimientoStock" AS ENUM ('ENTRADA', 'SALIDA', 'AJUSTE_POSITIVO', 'AJUSTE_NEGATIVO', 'TRANSFERENCIA_ENTRADA', 'TRANSFERENCIA_SALIDA');

-- CreateEnum
CREATE TYPE "EstadoCompra" AS ENUM ('BORRADOR', 'CONFIRMADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoReserva" AS ENUM ('MESA', 'FIESTA');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('PENDIENTE', 'SENADA', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA', 'ASISTIO', 'NO_ASISTIO');

-- CreateEnum
CREATE TYPE "EstadoCalculoCompra" AS ENUM ('BORRADOR', 'CONFIRMADO', 'COMPRA_REALIZADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT,
    "contrasenaHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'OPERADOR',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades_medida" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "permiteDecimal" BOOLEAN NOT NULL DEFAULT true,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidades_medida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoItem" NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "unidadMedidaId" TEXT NOT NULL,
    "unidadesPorPack" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "inventario" "TipoInventario" NOT NULL,
    "cantidadActual" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "cantidadMinima" DECIMAL(12,3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_stock" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "inventario" "TipoInventario" NOT NULL,
    "tipo" "TipoMovimientoStock" NOT NULL,
    "cantidad" DECIMAL(12,3) NOT NULL,
    "cantidadAnterior" DECIMAL(12,3) NOT NULL,
    "cantidadPosterior" DECIMAL(12,3) NOT NULL,
    "motivo" TEXT,
    "usuarioId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimientos_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "observaciones" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compras" (
    "id" TEXT NOT NULL,
    "proveedorId" TEXT,
    "inventario" "TipoInventario" NOT NULL,
    "estado" "EstadoCompra" NOT NULL DEFAULT 'BORRADOR',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroComprobante" TEXT,
    "total" DECIMAL(14,2),
    "observaciones" TEXT,
    "usuarioId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_compra" (
    "id" TEXT NOT NULL,
    "compraId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidad" DECIMAL(12,3) NOT NULL,
    "precioUnitario" DECIMAL(14,2),
    "subtotal" DECIMAL(14,2),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detalles_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" TEXT NOT NULL,
    "tipo" "TipoReserva" NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'PENDIENTE',
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "cantidadPersonas" INTEGER NOT NULL,
    "cantidadMenusSinTacc" INTEGER,
    "tipoFiesta" TEXT,
    "observaciones" TEXT,
    "motivoCancelacion" TEXT,
    "precioTotal" DECIMAL(14,2),
    "montoSena" DECIMAL(14,2),
    "saldoPendiente" DECIMAL(14,2),
    "medioPagoSena" TEXT,
    "fechaSena" TIMESTAMP(3),
    "fechaPagoFinal" TIMESTAMP(3),
    "medioPagoFinal" TEXT,
    "usuarioCreadorId" TEXT,
    "usuarioActualizadorId" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_reservas" (
    "id" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "accion" TEXT NOT NULL,
    "campo" TEXT,
    "valorAnterior" TEXT,
    "valorNuevo" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formulas_compra" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formulas_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_formulas_compra" (
    "id" TEXT NOT NULL,
    "formulaId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadReferencia" DECIMAL(12,3) NOT NULL,
    "personasReferencia" INTEGER NOT NULL,
    "unidadesPorPack" INTEGER,
    "observaciones" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detalles_formulas_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculos_compra_fiesta" (
    "id" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "formulaId" TEXT,
    "cantidadPersonas" INTEGER NOT NULL,
    "estado" "EstadoCalculoCompra" NOT NULL DEFAULT 'BORRADOR',
    "observaciones" TEXT,
    "usuarioId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calculos_compra_fiesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_calculos_compra" (
    "id" TEXT NOT NULL,
    "calculoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cantidadCalculada" DECIMAL(12,3) NOT NULL,
    "cantidadAjustada" DECIMAL(12,3),
    "cantidadComprada" DECIMAL(12,3),
    "cantidadPacksCalculada" DECIMAL(12,3),
    "unidadesPorPack" INTEGER,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detalles_calculos_compra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_medida_nombre_key" ON "unidades_medida"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_medida_abreviatura_key" ON "unidades_medida"("abreviatura");

-- CreateIndex
CREATE INDEX "items_categoriaId_idx" ON "items"("categoriaId");

-- CreateIndex
CREATE INDEX "items_unidadMedidaId_idx" ON "items"("unidadMedidaId");

-- CreateIndex
CREATE UNIQUE INDEX "items_nombre_tipo_key" ON "items"("nombre", "tipo");

-- CreateIndex
CREATE INDEX "stocks_inventario_idx" ON "stocks"("inventario");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_itemId_inventario_key" ON "stocks"("itemId", "inventario");

-- CreateIndex
CREATE INDEX "movimientos_stock_itemId_idx" ON "movimientos_stock"("itemId");

-- CreateIndex
CREATE INDEX "movimientos_stock_inventario_idx" ON "movimientos_stock"("inventario");

-- CreateIndex
CREATE INDEX "movimientos_stock_creadoEn_idx" ON "movimientos_stock"("creadoEn");

-- CreateIndex
CREATE INDEX "proveedores_nombre_idx" ON "proveedores"("nombre");

-- CreateIndex
CREATE INDEX "compras_proveedorId_idx" ON "compras"("proveedorId");

-- CreateIndex
CREATE INDEX "compras_inventario_idx" ON "compras"("inventario");

-- CreateIndex
CREATE INDEX "compras_fecha_idx" ON "compras"("fecha");

-- CreateIndex
CREATE INDEX "detalles_compra_itemId_idx" ON "detalles_compra"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "detalles_compra_compraId_itemId_key" ON "detalles_compra"("compraId", "itemId");

-- CreateIndex
CREATE INDEX "reservas_tipo_idx" ON "reservas"("tipo");

-- CreateIndex
CREATE INDEX "reservas_estado_idx" ON "reservas"("estado");

-- CreateIndex
CREATE INDEX "reservas_fechaHora_idx" ON "reservas"("fechaHora");

-- CreateIndex
CREATE INDEX "reservas_nombreCliente_idx" ON "reservas"("nombreCliente");

-- CreateIndex
CREATE INDEX "historial_reservas_reservaId_idx" ON "historial_reservas"("reservaId");

-- CreateIndex
CREATE INDEX "historial_reservas_usuarioId_idx" ON "historial_reservas"("usuarioId");

-- CreateIndex
CREATE INDEX "historial_reservas_creadoEn_idx" ON "historial_reservas"("creadoEn");

-- CreateIndex
CREATE UNIQUE INDEX "formulas_compra_nombre_key" ON "formulas_compra"("nombre");

-- CreateIndex
CREATE INDEX "detalles_formulas_compra_itemId_idx" ON "detalles_formulas_compra"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "detalles_formulas_compra_formulaId_itemId_key" ON "detalles_formulas_compra"("formulaId", "itemId");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_reservaId_idx" ON "calculos_compra_fiesta"("reservaId");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_formulaId_idx" ON "calculos_compra_fiesta"("formulaId");

-- CreateIndex
CREATE INDEX "calculos_compra_fiesta_estado_idx" ON "calculos_compra_fiesta"("estado");

-- CreateIndex
CREATE INDEX "detalles_calculos_compra_itemId_idx" ON "detalles_calculos_compra"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "detalles_calculos_compra_calculoId_itemId_key" ON "detalles_calculos_compra"("calculoId", "itemId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "unidades_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_stock" ADD CONSTRAINT "movimientos_stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_stock" ADD CONSTRAINT "movimientos_stock_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_compra" ADD CONSTRAINT "detalles_compra_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_compra" ADD CONSTRAINT "detalles_compra_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_usuarioCreadorId_fkey" FOREIGN KEY ("usuarioCreadorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_usuarioActualizadorId_fkey" FOREIGN KEY ("usuarioActualizadorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_reservas" ADD CONSTRAINT "historial_reservas_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_reservas" ADD CONSTRAINT "historial_reservas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_formulas_compra" ADD CONSTRAINT "detalles_formulas_compra_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "formulas_compra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_formulas_compra" ADD CONSTRAINT "detalles_formulas_compra_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculos_compra_fiesta" ADD CONSTRAINT "calculos_compra_fiesta_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "reservas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculos_compra_fiesta" ADD CONSTRAINT "calculos_compra_fiesta_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "formulas_compra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculos_compra_fiesta" ADD CONSTRAINT "calculos_compra_fiesta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_calculos_compra" ADD CONSTRAINT "detalles_calculos_compra_calculoId_fkey" FOREIGN KEY ("calculoId") REFERENCES "calculos_compra_fiesta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_calculos_compra" ADD CONSTRAINT "detalles_calculos_compra_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
