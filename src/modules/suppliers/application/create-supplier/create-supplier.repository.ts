import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateSupplierData {
  razonSocial: string;
  nombreComercial?: string;
  cuit: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  observaciones?: string;
}

@Injectable()
export class CreateSupplierRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async exists(cuit: string): Promise<boolean> {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: {
        cuit,
      },
      select: {
        id: true,
      },
    });

    return proveedor !== null;
  }

  async create(data: CreateSupplierData) {
    return this.prisma.proveedor.create({
      data,
    });
  }
}