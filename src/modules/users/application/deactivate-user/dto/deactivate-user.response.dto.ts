import { RolUsuario } from '../../../../../generated/prisma/enums';

export class DeactivateUserResponseDto {
  id!: string;
  nombreCompleto!: string;
  usuario!: string;
  email!: string | null;
  rol!: RolUsuario;
  activo!: boolean;
  creadoEn!: Date;
  actualizadoEn!: Date;
}