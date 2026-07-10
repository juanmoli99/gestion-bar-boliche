import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeactivateUserRepository } from './deactivate-user.repository';
import { DeactivateUserResponseDto } from './dto/deactivate-user.response.dto';

@Injectable()
export class DeactivateUserUseCase {
  constructor(
    private readonly repository: DeactivateUserRepository,
  ) {}

  async execute(id: string): Promise<DeactivateUserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    if (!user.activo) {
      throw new ConflictException('El usuario ya está desactivado.');
    }

    return this.repository.deactivate(id);
  }
}