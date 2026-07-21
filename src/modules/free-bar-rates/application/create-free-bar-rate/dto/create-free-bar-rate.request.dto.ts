import {
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFreeBarRateRequestDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsNumber()
  @Min(0)
  valorPersona!: number;
}