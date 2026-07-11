import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateUnitData {
  nombre?: string;
  abreviatura?: string;
  permiteDecimal?: boolean;
}

@Injectable()
export class UpdateUnitRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string) {
    return this.prisma.unidadMedida.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        abreviatura: true,
      },
    });
  }

  async exists(
    nombre: string,
    abreviatura: string,
    excludeId: string,
  ): Promise<boolean> {
    const unidad = await this.prisma.unidadMedida.findFirst({
      where: {
        id: {
          not: excludeId,
        },
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

  async update(
    id: string,
    data: UpdateUnitData,
  ) {
    return this.prisma.unidadMedida.update({
      where: { id },
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