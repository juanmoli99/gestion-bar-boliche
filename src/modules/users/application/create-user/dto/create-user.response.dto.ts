export class CreateUserResponseDto {
  id!: string;
  nombreCompleto!: string;
  usuario!: string;
  email!: string | null;
  rol!: string;
  activo!: boolean;
  creadoEn!: Date;
}