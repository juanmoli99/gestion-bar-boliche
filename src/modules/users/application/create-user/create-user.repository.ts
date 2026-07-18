import {
  Injectable,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  PrismaService,
} from '../../../../core/database/prisma.service';

interface CreateUserData {
  nombreCompleto: string;
  usuario: string;
  email: string | null;
  contrasenaHash: string;
  rol: RolUsuario;
}

@Injectable()
export class CreateUserRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  async findByUsername(
    usuario: string,
  ) {
    return this.prisma.usuario.findUnique({
      where: {
        usuario,
      },

      select: {
        id: true,
        activo: true,
      },
    });
  }

  async findByEmail(
    email: string,
  ) {
    return this.prisma.usuario.findUnique({
      where: {
        email,
      },

      select: {
        id: true,
        activo: true,
      },
    });
  }

  async create(
    data: CreateUserData,
  ) {
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

  async reactivate(
    id: string,
    data: CreateUserData,
  ) {
    return this.prisma.usuario.update({
      where: {
        id,
      },

      data: {
        nombreCompleto:
          data.nombreCompleto,

        usuario:
          data.usuario,

        email:
          data.email,

        contrasenaHash:
          data.contrasenaHash,

        rol:
          data.rol,

        activo:
          true,
      },

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