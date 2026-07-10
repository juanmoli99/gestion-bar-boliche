import { IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  usuario!: string;

  @IsString()
  @MinLength(8)
  contrasena!: string;
}