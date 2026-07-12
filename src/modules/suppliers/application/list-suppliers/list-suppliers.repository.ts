import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListSuppliersRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.proveedor.findMany({
      orderBy: {
        razonSocial: 'asc',
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