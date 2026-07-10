export class ReactivateItemResponseDto {
  id!: string;
  nombre!: string;
  descripcion!: string | null;
  tipo!: string;

  categoriaId!: string;
  unidadMedidaId!: string;

  unidadesPorPack!: number | null;
  activo!: boolean;

  creadoEn!: Date;
  actualizadoEn!: Date;
}