import {
  IsNumber,
  Min,
} from 'class-validator';

export class InventoryCountRequestDto {
  @IsNumber()
  @Min(0)
  cantidadContada!: number;
}