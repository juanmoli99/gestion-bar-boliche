export class CreateFormulaResponseDto {
  id!: string;
  nombre!: string;
  descripcion!: string | null;
  activa!: boolean;
  creadoEn!: Date;
  actualizadoEn!: Date;
}