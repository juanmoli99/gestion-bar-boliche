import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdateStockRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadActual?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadMinima?: number;
}