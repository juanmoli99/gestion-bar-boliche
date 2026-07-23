import {
  IsDateString,
} from 'class-validator';

export class CalculateDinnerShoppingListRequestDto {
  @IsDateString()
  fechaDesde!: string;

  @IsDateString()
  fechaHasta!: string;
}
