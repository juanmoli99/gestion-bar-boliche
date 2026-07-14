import { IsDateString } from 'class-validator';

export class CalculateShoppingListRequestDto {
  @IsDateString()
  fechaDesde!: string;

  @IsDateString()
  fechaHasta!: string;
}