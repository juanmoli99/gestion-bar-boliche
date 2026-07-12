import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ReactivateSupplierRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.proveedor.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });
  }

  async reactivate(id: string) {
    return this.prisma.proveedor.update({
      where: { id },
      data: {
        activo: true,
      },
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