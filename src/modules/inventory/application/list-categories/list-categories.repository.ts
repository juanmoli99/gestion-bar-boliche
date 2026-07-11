import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class ListCategoriesRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.categoria.findMany({
      orderBy: [
        {
          inventario: 'asc',
        },
        {
          nombre: 'asc',
        },
      ],
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        inventario: true,
        activa: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}