export class LoginResponseDto {
  accessToken!: string;
  refreshToken!: string;

  usuario!: {
    id: string;
    nombreCompleto: string;
    usuario: string;
    rol: string;
  };
}