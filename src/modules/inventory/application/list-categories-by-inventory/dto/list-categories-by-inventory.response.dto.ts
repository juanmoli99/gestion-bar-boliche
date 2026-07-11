import { TipoInventario } from '../../../../../generated/prisma/enums';

export class ListCategoriesByInventoryResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  inventario!: TipoInventario;

  activa!: boolean;
}