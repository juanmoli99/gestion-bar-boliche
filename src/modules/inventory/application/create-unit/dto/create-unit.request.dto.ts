import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUnitRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsString()
  @MaxLength(20)
  abreviatura!: string;

  @IsOptional()
  @IsBoolean()
  permiteDecimal?: boolean;
}