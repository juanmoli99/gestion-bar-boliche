import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { UpdateUserResponseDto } from './dto/update-user.response.dto';
import { UpdateUserRepository } from './update-user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repository: UpdateUserRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    const normalizedUsername = request.usuario?.trim().toLowerCase();
    const normalizedEmail =
      request.email === null
        ? null
        : request.email?.trim().toLowerCase();

    if (normalizedUsername) {
      const usernameExists = await this.repository.existsByUsername(
        normalizedUsername,
        id,
      );

      if (usernameExists) {
        throw new ConflictException(
          'El nombre de usuario ya está registrado.',
        );
      }
    }

    if (normalizedEmail) {
      const emailExists = await this.repository.existsByEmail(
        normalizedEmail,
        id,
      );

      if (emailExists) {
        throw new ConflictException(
          'El correo electrónico ya está registrado.',
        );
      }
    }

    return this.repository.update(id, {
      nombreCompleto: request.nombreCompleto?.trim(),
      usuario: normalizedUsername,
      email: normalizedEmail,
      rol: request.rol,
    });
  }
}