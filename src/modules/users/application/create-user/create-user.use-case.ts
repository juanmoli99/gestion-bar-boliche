import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRepository } from './create-user.repository';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: CreateUserRepository,
  ) {}

  async execute(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const usernameExists = await this.repository.existsByUsername(
      request.usuario,
    );

    if (usernameExists) {
      throw new ConflictException('El nombre de usuario ya está registrado.');
    }

    if (request.email) {
      const emailExists = await this.repository.existsByEmail(request.email);

      if (emailExists) {
        throw new ConflictException('El correo electrónico ya está registrado.');
      }
    }

    const contrasenaHash = await bcrypt.hash(request.contrasena, 12);

    return this.repository.create({
      nombreCompleto: request.nombreCompleto.trim(),
      usuario: request.usuario.trim().toLowerCase(),
      email: request.email?.trim().toLowerCase() ?? null,
      contrasenaHash,
      rol: request.rol,
    });
  }
}