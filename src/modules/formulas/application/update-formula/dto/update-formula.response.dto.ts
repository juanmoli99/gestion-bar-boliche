export class UpdateFormulaItemResponseDto {
  id!: string;
  itemId!: string;
  nombreItem!: string;
  unidadMedida!: string;
  abreviaturaUnidad!: string;
  cantidadPorPersona!: number;
}

export class UpdateFormulaResponseDto {
  id!: string;
  nombre!: string;
  descripcion!: string | null;
  activa!: boolean;

  versionId!: string;
  numeroVersion!: number;

  items!: UpdateFormulaItemResponseDto[];

  actualizadoEn!: Date;
}