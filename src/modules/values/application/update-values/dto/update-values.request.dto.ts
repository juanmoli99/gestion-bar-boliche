import { IsNumber, Min } from 'class-validator';

export class UpdateValuesRequestDto {
  @IsNumber()
  @Min(0)
  pizzaLibreGeneral!: number;

  @IsNumber()
  @Min(0)
  pizzaLibreViernes!: number;

  @IsNumber()
  @Min(0)
  pizzaLibreSabado!: number;

  @IsNumber()
  @Min(0)
  menuSinTacc!: number;
}