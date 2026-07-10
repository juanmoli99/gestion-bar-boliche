import { Injectable } from '@nestjs/common';
import { RolUsuario } from '../../../../generated/prisma/enums';
import { PrismaService } from '../../../../core/database/prisma.service';

interface UpdateUserData {
  nombreCompleto?: string;
  usuario?: string;
  email?: string | null;
  rol?: RolUsuario;
}

@Injectable()
export class UpdateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        usuario: true,
        email: true,
      },
    });
  }

  async existsByUsername(usuario: string, excludeId: string): Promise<boolean> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        usuario,
        id: {
          not: excludeId,
        },
      },
      select: {
        id: true,
      },
    });

    return user !== null;
  }

  async existsByEmail(email: string, excludeId: string): Promise<boolean> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email,
        id: {
          not: excludeId,
        },
      },
      select: {
        id: true,
      },
    });

    return user !== null;
  }

  async update(id: string, data: UpdateUserData) {
    return this.prisma.usuario.update({
      where: { id },
      data,
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