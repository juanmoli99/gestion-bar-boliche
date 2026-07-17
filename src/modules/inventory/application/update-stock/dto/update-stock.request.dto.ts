import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdateStockRequestDto {
  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0)
  cantidadMinima?: number;
}