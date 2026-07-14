import {
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateFormulaVersionItemRequestDto {
  @IsNumber()
  @Min(0.0001)
  cantidadPorPersona!: number;
}