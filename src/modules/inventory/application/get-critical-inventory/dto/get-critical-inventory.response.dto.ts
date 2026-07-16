import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  TipoInventario,
} from '../../../../../generated/prisma/enums';

export type CriticidadInventario =
  | 'SIN_STOCK'
  | 'STOCK_BAJO';

export class CriticalInventoryItemDto {
  id!: string;

  itemId!: string;

  itemNombre!: string;

  categoriaNombre!: string;

  unidadMedida!: string;

  abreviaturaUnidad!: string;

  inventario!: TipoInventario;

  cantidadActual!: Decimal;

  cantidadMinima!: Decimal;

  criticidad!: CriticidadInventario;

  faltante!: Decimal;
}

export class CriticalInventoryGroupDto {
  inventario!: TipoInventario;

  items!: CriticalInventoryItemDto[];
}

export class GetCriticalInventoryResponseDto {
  groups!: CriticalInventoryGroupDto[];
}