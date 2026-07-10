import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RolUsuario } from '../../../../../generated/prisma/enums';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombreCompleto?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  usuario?: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;
}