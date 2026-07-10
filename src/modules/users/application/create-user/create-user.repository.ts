import { Injectable } from '@nestjs/common';
import { RolUsuario } from '../../../../generated/prisma/enums';
import { PrismaService } from '../../../../core/database/prisma.service';

interface CreateUserData {
  nombreCompleto: string;
  usuario: string;
  email: string | null;
  contrasenaHash: string;
  rol: RolUsuario;
}

@Injectable()
export class CreateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByUsername(usuario: string): Promise<boolean> {
    const user = await this.prisma.usuario.findUnique({
      where: { usuario },
      select: { id: true },
    });

    return user !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      select: { id: true },
    });

    return user !== null;
  }

  async create(data: CreateUserData) {
    return this.prisma.usuario.create({
      data,
      select: {
        id: true,
        nombreCompleto: true,
        usuario: true,
        email: true,
        rol: true,
        activo: true,
        creadoEn: true,
      },
    });
  }
}