import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EstadoCompra,
} from '../../../../generated/prisma/enums';

import {
  CreatePurchaseRepository,
} from './create-purchase.repository';

import {
  CreatePurchaseRequestDto,
} from './dto/create-purchase.request.dto';

import {
  CreatePurchaseResponseDto,
} from './dto/create-purchase.response.dto';

@Injectable()
export class CreatePurchaseUseCase {
  constructor(
    private readonly repository:
      CreatePurchaseRepository,
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

    if (
      request.detalles &&
      request.detalles.length === 0
    ) {
      throw new BadRequestException(
        'La compra debe contener al menos un detalle.',
      );
    }

    if (
      request.detalles &&
      request.detalles.length > 0
    ) {
      const itemsBelongToSupplier =
        await this.repository.itemsBelongToSupplier(
          request.detalles.map(
            (detalle) =>
              detalle.itemId,
          ),
          request.proveedorId,
        );

      if (!itemsBelongToSupplier) {
        throw new BadRequestException(
          'Uno o más ítems no pertenecen al proveedor seleccionado.',
        );
      }
    }

    return this.repository.create({
      proveedorId:
        request.proveedorId,

      numeroComprobante:
        request.numeroComprobante
          ?.trim(),

      observaciones:
        request.observaciones
          ?.trim(),

      estado:
        request.estado ??
        EstadoCompra.BORRADOR,

      inventario:
        request.inventario,

      detalles:
        request.detalles?.map(
          (detalle) => ({
            itemId:
              detalle.itemId,

            cantidad:
              detalle.cantidad,

            precioUnitario:
              detalle.precioUnitario,

            porcentajeDescuento:
              detalle
                .porcentajeDescuento,

            porcentajeIva:
              detalle
                .porcentajeIva,
          }),
        ),
    });
  }
}