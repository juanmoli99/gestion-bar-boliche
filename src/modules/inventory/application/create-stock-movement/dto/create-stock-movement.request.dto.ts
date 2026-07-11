import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import {
  TipoInventario,
  TipoMovimientoStock,
} from '../../../../../generated/prisma/enums';

export class CreateStockMovementRequestDto {
  @IsUUID()
  itemId!: string;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;

  @IsEnum(TipoMovimientoStock)
  tipo!: TipoMovimientoStock;

  @IsNumber()
  @Min(0.001)
  cantidad!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  motivo?: string;
}