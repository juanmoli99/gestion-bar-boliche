import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  EstadoReserva,
} from '../../../../../generated/prisma/enums';

export class UpdateReservationStatusRequestDto {
  @IsEnum(EstadoReserva)
  estado!: EstadoReserva;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacion?: string;
}