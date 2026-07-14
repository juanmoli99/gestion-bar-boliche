import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  EstadoReserva,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class ListReservationsRequestDto {
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @IsOptional()
  @IsDateString()
  fechaHasta?: string;

  @IsOptional()
  @IsEnum(TipoReserva)
  tipo?: TipoReserva;

  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;

  @IsOptional()
  @IsString()
  nombreCliente?: string;
}