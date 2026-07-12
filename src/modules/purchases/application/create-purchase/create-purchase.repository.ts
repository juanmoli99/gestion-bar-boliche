import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

import {
  EstadoCompra,
  TipoInventario,
} from '../../../../generated/prisma/enums';

interface CreatePurchaseData {
  proveedorId: string;
  inventario: TipoInventario;
  numeroComprobante?: string;
  observaciones?: string;
  estado: EstadoCompra;
}

@Injectable()
export class CreatePurchaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async supplierExists(
    proveedorId: string,
  ): Promise<boolean> {
    const supplier = await this.prisma.proveedor.findUnique({
      where: {
        id: proveedorId,
      },
      select: {
        id: true,
        activo: true,
      },
    });

    return supplier?.activo === true;
  }

  async create(
    data: CreatePurchaseData,
  ) {
    return this.prisma.compra.create({
      data: {
        proveedorId: data.proveedorId,
        inventario: data.inventario,
        numeroComprobante: data.numeroComprobante,
        observaciones: data.observaciones,
        estado: data.estado,
      },
      select: {
        id: true,
        proveedorId: true,
        inventario: true,
        numeroComprobante: true,
        observaciones: true,
        estado: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}