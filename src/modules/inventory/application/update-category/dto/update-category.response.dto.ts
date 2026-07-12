import { TipoInventario } from '../../../../../generated/prisma/enums';

export class UpdateCategoryResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  inventario!: TipoInventario;

  activa!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;
}