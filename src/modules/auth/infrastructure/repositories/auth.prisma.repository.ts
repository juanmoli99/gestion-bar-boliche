import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class AuthPrismaRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async buscarPorUsuario(usuario: string) {
    return this.prisma.usuario.findUnique({
      where: {
        usuario,
      },
      select: {
        id: true,
        nombreCompleto: true,
        usuario: true,
        contrasenaHash: true,
        rol: true,
        activo: true,
      },
    });
  }
}