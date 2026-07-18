import {
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSalaryPositionRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsNumber()
  @Min(0)
  valorHora!: number;
}