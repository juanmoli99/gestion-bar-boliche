import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import {
  ModalidadFiesta,
  TipoReserva,
} from '../../../../../generated/prisma/enums';

export class CreateReservationRequestDto {
  @IsEnum(TipoReserva)
  tipo!: TipoReserva;

  @IsString()
  @MaxLength(150)
  nombreCliente!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefonoCliente?: string;

  @IsDateString()
  fechaHora!: string;

  @IsInt()
  @Min(1)
  cantidadPersonas!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadMenusSinTacc?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  tipoFiesta?: string;

  @IsOptional()
  @IsEnum(ModalidadFiesta)
  modalidadFiesta?: ModalidadFiesta;

  @IsOptional()
  @IsUUID()
  formulaId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observaciones?: string;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  montoSena?: number;
}