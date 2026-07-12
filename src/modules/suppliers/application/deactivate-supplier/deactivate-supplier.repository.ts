import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeactivateSupplierRepository {
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

  async deactivate(id: string) {
    return this.prisma.proveedor.update({
      where: { id },
      data: {
        activo: false,
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