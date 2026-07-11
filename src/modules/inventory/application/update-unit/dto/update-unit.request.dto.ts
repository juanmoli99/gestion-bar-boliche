import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUnitRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  abreviatura?: string;

  @IsOptional()
  @IsBoolean()
  permiteDecimal?: boolean;
}