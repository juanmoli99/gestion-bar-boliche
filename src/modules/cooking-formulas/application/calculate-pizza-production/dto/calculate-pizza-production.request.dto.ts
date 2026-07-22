import {
  IsDateString,
} from 'class-validator';

export class CalculatePizzaProductionRequestDto {
  @IsDateString()
  fechaDesde!: string;

  @IsDateString()
  fechaHasta!: string;
}