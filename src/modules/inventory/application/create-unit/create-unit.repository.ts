import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateUnitData {
  nombre: string;
  abreviatura: string;
  permiteDecimal?: boolean;
}

@Injectable()
export class CreateUnitRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async exists(
    nombre: string,
    abreviatura: string,
  ): Promise<boolean> {
    const unidad = await this.prisma.unidadMedida.findFirst({
      where: {
        OR: [
          { nombre },
          { abreviatura },
        ],
      },
      select: {
        id: true,
      },
    });

    return unidad !== null;
  }

  async create(data: CreateUnitData) {
    return this.prisma.unidadMedida.create({
      data,
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