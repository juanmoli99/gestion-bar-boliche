import { EstadoCompra, TipoInventario } from '../../../../../generated/prisma/enums';
export class CreatePurchaseResponseDto {
  id!: string;

  proveedorId!: string;

  numeroComprobante!: string | null;

  observaciones!: string | null;

  estado!: EstadoCompra;

  creadoEn!: Date;

  actualizadoEn!: Date;

  inventario!: TipoInventario;
}