import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class DeactivateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        activo: true,
      },
    });
  }

  async deactivate(id: string) {
    return this.prisma.usuario.update({
      where: { id },
      data: {
        activo: false,
      },
      select: {
        id: true,
        nombreCompleto: true,
        usuario: true,
        email: true,
        rol: true,
        activo: true,
        creadoEn: true,
        actualizadoEn: true,
      },
    });
  }
}