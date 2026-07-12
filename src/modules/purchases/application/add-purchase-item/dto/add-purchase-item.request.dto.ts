import {
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class AddPurchaseItemRequestDto {
  @IsUUID()
  itemId!: string;

  @IsNumber()
  @Min(0.001)
  cantidad!: number;

  @IsNumber()
  @Min(0)
  precioUnitario!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeDescuento!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeIva!: number;
}