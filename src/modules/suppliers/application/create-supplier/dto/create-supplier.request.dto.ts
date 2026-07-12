import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateSupplierRequestDto {
  @IsString()
  @MaxLength(200)
  razonSocial!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreComercial?: string;

  @IsString()
  @Length(11, 11)
  cuit!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  direccion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ciudad?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  provincia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigoPostal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;
}