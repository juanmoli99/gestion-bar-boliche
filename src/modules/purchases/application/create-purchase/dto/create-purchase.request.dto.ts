import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { EstadoCompra , TipoInventario } from '../../../../../generated/prisma/enums';

export class CreatePurchaseRequestDto {
  @IsUUID()
  proveedorId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  numeroComprobante?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;

  @IsOptional()
  @IsEnum(EstadoCompra)
  estado?: EstadoCompra;

  @IsEnum(TipoInventario)
  inventario!: TipoInventario;
}