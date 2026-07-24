import {
  TipoItem,
} from '../../../../../generated/prisma/enums';

export class ListItemsResponseDto {
  id!: string;
  nombre!: string;
  descripcion!: string | null;
  tipo!: TipoItem;

  categoriaId!: string;
  unidadMedidaId!: string;
  proveedorId!: string;

  unidadesPorPack!: number;
  activo!: boolean;

  creadoEn!: Date;
  actualizadoEn!: Date;
}