import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
  CreateUserRepository,
} from './create-user.repository';

import {
  CreateUserRequestDto,
} from './dto/create-user.request.dto';

import {
  CreateUserResponseDto,
} from './dto/create-user.response.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository:
      CreateUserRepository,
  ) {}

  async execute(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const nombreCompleto =
      request.nombreCompleto.trim();

    const usuario =
      request.usuario
        .trim()
        .toLowerCase();

    const email =
      request.email
        ?.trim()
        .toLowerCase() ||
      null;

    const existingUser =
      await this.repository.findByUsername(
        usuario,
      );

    if (
      existingUser?.activo
    ) {
      throw new ConflictException(
        'El nombre de usuario ya está registrado.',
      );
    }

    if (email) {
      const emailOwner =
        await this.repository.findByEmail(
          email,
        );

      if (
        emailOwner &&
        emailOwner.id !==
          existingUser?.id
      ) {
        throw new ConflictException(
          'El correo electrónico ya está registrado en otra cuenta.',
        );
      }
    }

    const contrasenaHash =
      await bcrypt.hash(
        request.contrasena,
        12,
      );

    const data = {
      nombreCompleto,
      usuario,
      email,
      contrasenaHash,
      rol:
        request.rol,
    };

    if (existingUser) {
      return this.repository.reactivate(
        existingUser.id,
        data,
      );
    }

    return this.repository.create(
      data,
    );
  }
}