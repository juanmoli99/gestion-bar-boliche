import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFormulaRequestDto {
  @IsString()
  @MaxLength(150)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;
}