import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  TipoInventario,
} from '../../../../../generated/prisma/enums';

export class ListStockResponseDto {
  id!: string;

  itemId!: string;

  itemNombre!: string;

  categoriaNombre!: string;

  unidadMedida!: string;

  abreviaturaUnidad!: string;

  inventario!: TipoInventario;

  cantidadActual!: Decimal;

  cantidadMinima!: Decimal | null;

  creadoEn!: Date;

  actualizadoEn!: Date;
}