import {
  IsNumber,
  Min,
} from 'class-validator';

export class InventoryCountRequestDto {
  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0)
  cantidadContada!: number;
}