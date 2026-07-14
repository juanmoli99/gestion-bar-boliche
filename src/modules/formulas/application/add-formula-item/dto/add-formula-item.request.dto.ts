import {
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

export class AddFormulaItemRequestDto {
  @IsUUID()
  itemId!: string;

  @IsNumber()
  @Min(0.0001)
  cantidadPorPersona!: number;
}