import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class FindUserByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
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