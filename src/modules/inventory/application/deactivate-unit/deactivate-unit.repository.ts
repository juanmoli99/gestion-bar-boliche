import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeactivateUnitRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.unidadMedida.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });
  }

  async deactivate(id: string) {
    return this.prisma.unidadMedida.update({
      where: { id },
      data: {
        activa: false,
      },
      select: {
        id: true,
        nombre: true,
        abreviatura: true,
        permiteDecimal: true,
        activa: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}