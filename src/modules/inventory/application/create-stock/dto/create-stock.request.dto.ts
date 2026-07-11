import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

import { TipoInventario } from '../../../../../generated/prisma/enums';

export class CreateStockRequestDto {
  @IsUUID()
  itemId!: string;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadActual?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadMinima?: number;
}