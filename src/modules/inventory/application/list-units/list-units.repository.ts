import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListUnitsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.unidadMedida.findMany({
      orderBy: {
        nombre: 'asc',
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