import {
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../../generated/prisma/enums';

class CreatePurchaseDetailRequestDto {
  @IsUUID()
  itemId!: string;

  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0.001)
  cantidad!: number;

  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  precioUnitario!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  porcentajeDescuento?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  porcentajeIva?: number;
}

export class CreatePurchaseRequestDto {
  @IsUUID()
  proveedorId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  numeroComprobante?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;

  @IsOptional()
  @IsEnum(EstadoCompra)
  estado?: EstadoCompra;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () =>
      CreatePurchaseDetailRequestDto,
  )
  detalles?: CreatePurchaseDetailRequestDto[];
}