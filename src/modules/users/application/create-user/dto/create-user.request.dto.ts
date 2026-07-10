import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RolUsuario } from '../../../../../generated/prisma/enums';

export class CreateUserRequestDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombreCompleto!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  usuario!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  contrasena!: string;

  @IsEnum(RolUsuario)
  rol!: RolUsuario;
}