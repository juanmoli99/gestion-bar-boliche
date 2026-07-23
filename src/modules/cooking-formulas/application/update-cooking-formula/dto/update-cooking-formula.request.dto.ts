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

export class UpdateCookingFormulaItemRequestDto {
  @IsUUID('4')
  itemId!: string;

  @IsNumber()
  @Min(0)
  cantidadPorPersona!: number;
}

export class UpdateCookingFormulaRequestDto {
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
      UpdateCookingFormulaItemRequestDto,
  )
  items!: UpdateCookingFormulaItemRequestDto[];
}