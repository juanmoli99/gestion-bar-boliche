export class ListFormulasResponseDto {
  id!: string;

  nombre!: string;

  descripcion!: string | null;

  activa!: boolean;

  versionActiva!: number;

  cantidadItems!: number;

  creadoEn!: Date;

  actualizadoEn!: Date;
}