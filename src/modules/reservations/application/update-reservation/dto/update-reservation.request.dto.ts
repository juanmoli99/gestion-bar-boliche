import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateReservationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombreCliente?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefonoCliente?: string;

  @IsOptional()
  @IsDateString()
  fechaHora?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cantidadPersonas?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadMenusSinTacc?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  tipoFiesta?: string;

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
  precioTotal?: number;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  montoSena?: number;
}