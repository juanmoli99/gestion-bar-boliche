export class ListSuppliersResponseDto {
  id!: string;

  razonSocial!: string;

  nombreComercial!: string | null;

  cuit!: string;

  telefono!: string | null;

  email!: string | null;

  direccion!: string | null;

  ciudad!: string | null;

  provincia!: string | null;

  codigoPostal!: string | null;

  observaciones!: string | null;

  activo!: boolean;

  creadoEn!: Date;

  actualizadoEn!: Date;
}