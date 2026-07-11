import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import {
  TipoInventario,
  TipoItem,
} from '../../../../../generated/prisma/enums';

export class CreateItemRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;

  @IsEnum(TipoItem)
  tipo!: TipoItem;

  @IsUUID()
  categoriaId!: string;

  @IsUUID()
  unidadMedidaId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  unidadesPorPack?: number;
}