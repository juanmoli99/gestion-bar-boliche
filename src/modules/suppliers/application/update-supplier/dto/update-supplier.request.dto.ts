import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateSupplierRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  razonSocial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreComercial?: string | null;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  cuit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string | null;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  direccion?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ciudad?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  provincia?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigoPostal?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string | null;
}