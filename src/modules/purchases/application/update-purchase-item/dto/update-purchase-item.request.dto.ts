import {
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class UpdatePurchaseItemRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(0.001)
  cantidad?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precioUnitario?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeDescuento?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeIva?: number;
}