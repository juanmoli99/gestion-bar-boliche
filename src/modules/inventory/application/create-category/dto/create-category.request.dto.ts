import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TipoInventario } from '../../../../../generated/prisma/enums';

export class CreateCategoryRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;
}