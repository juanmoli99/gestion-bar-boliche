import { Decimal } from '../../../../../generated/prisma/internal/prismaNamespace';

import {
  TipoInventario,
  TipoMovimientoStock,
} from '../../../../../generated/prisma/enums';

export class CreateStockMovementResponseDto {
  id!: string;

  itemId!: string;

  inventario!: TipoInventario;

  tipo!: TipoMovimientoStock;

  cantidad!: Decimal;

  cantidadAnterior!: Decimal;

  cantidadPosterior!: Decimal;

  motivo!: string | null;

  usuarioId!: string | null;

  creadoEn!: Date;
}