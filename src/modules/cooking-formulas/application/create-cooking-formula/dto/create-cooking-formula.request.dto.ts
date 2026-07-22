import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  Type,
} from 'class-transformer';

export class CreateCookingFormulaItemRequestDto {
  @IsUUID('4')
  itemId!: string;

  @IsNumber()
  @Min(0.0001)
  cantidadPorPersona!: number;
}

export class CreateCookingFormulaRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(
    () =>
      CreateCookingFormulaItemRequestDto,
  )
  items!: CreateCookingFormulaItemRequestDto[];
}