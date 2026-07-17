import {
  TipoInventario,
  TipoItem,
} from '../../../../../generated/prisma/enums';

import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

export class CreateItemStockResponseDto {
  id!: string;

  itemId!: string;

  inventario!: TipoInventario;

  cantidadActual!: Decimal;

  cantidadMinima!: Decimal | null;

  creadoEn!: Date;

  actualizadoEn!: Date;
}

export class CreateItemResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  tipo!: TipoItem;

  categoriaId!: string;

  unidadMedidaId!: string;

  unidadesPorPack!: number | null;

  activo!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;

  stock!: CreateItemStockResponseDto;
}