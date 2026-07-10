import { TipoItem } from '../../../../../generated/prisma/enums';

export class FindItemByIdResponseDto {
  id!: string;
  nombre!: string;
  descripcion!: string | null;
  tipo!: TipoItem;

  categoriaId!: string;
  unidadMedidaId!: string;

  unidadesPorPack!: number | null;
  activo!: boolean;

  creadoEn!: Date;
  actualizadoEn!: Date;
}