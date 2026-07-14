import {
  IsDateString,
} from 'class-validator';

export class CalculatePurchasesRequestDto {
  @IsDateString()
  fechaDesde!: string;

  @IsDateString()
  fechaHasta!: string;
}