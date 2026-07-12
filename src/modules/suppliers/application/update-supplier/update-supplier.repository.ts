import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateSupplierData {
  razonSocial?: string;
  nombreComercial?: string;
  cuit?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  observaciones?: string;
}

@Injectable()
export class UpdateSupplierRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.proveedor.findUnique({
      where: { id },
      select: {
        id: true,
        cuit: true,
      },
    });
  }

  async existsByCuit(
    cuit: string,
    excludeId: string,
  ): Promise<boolean> {
    const supplier = await this.prisma.proveedor.findFirst({
      where: {
        cuit,
        id: {
          not: excludeId,
        },
      },
      select: {
        id: true,
      },
    });

    return supplier !== null;
  }

  async update(
    id: string,
    data: UpdateSupplierData,
  ) {
    return this.prisma.proveedor.update({
      where: { id },
      data,
      select: {
        id: true,
        razonSocial: true,
        nombreComercial: true,
        cuit: true,
        telefono: true,
        email: true,
        direccion: true,
        ciudad: true,
        provincia: true,
        codigoPostal: true,
        observaciones: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}