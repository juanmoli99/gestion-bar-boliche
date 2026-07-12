import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TipoInventario } from '../../../../../generated/prisma/enums';

export class UpdateCategoryRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsOptional()
  @IsEnum(TipoInventario)
  inventario?: TipoInventario;
}