import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EstadoCompra } from '../../../../generated/prisma/enums';

import { CreatePurchaseRepository } from './create-purchase.repository';
import { CreatePurchaseRequestDto } from './dto/create-purchase.request.dto';
import { CreatePurchaseResponseDto } from './dto/create-purchase.response.dto';

@Injectable()
export class CreatePurchaseUseCase {
  constructor(
    private readonly repository: CreatePurchaseRepository,
  ) {}

  async execute(
    request: CreatePurchaseRequestDto,
  ): Promise<CreatePurchaseResponseDto> {
    const supplierExists =
      await this.repository.supplierExists(
        request.proveedorId,
      );

    if (!supplierExists) {
      throw new NotFoundException(
        'El proveedor no existe.',
      );
    } 

    return this.repository.create({
      proveedorId: request.proveedorId,
      numeroComprobante:
        request.numeroComprobante?.trim(),
      observaciones:
        request.observaciones?.trim(),
      estado:
        request.estado ?? EstadoCompra.BORRADOR,
        inventario: request.inventario,
    });
  }
}