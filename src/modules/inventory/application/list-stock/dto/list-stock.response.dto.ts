import {
  Decimal,
} from '../../../../../generated/prisma/internal/prismaNamespace';

import { TipoInventario } from '../../../../../generated/prisma/enums';

export class ListStockResponseDto {
  id!: string;
  itemId!: string;

  inventario!: TipoInventario;

  cantidadActual!: Decimal;
  cantidadMinima!: Decimal | null;

  creadoEn!: Date;
  actualizadoEn!: Date;
}