import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReactivateUserRepository } from './reactivate-user.repository';
import { ReactivateUserResponseDto } from './dto/reactivate-user.response.dto';

@Injectable()
export class ReactivateUserUseCase {
  constructor(
    private readonly repository: ReactivateUserRepository,
  ) {}

  async execute(id: string): Promise<ReactivateUserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    if (user.activo) {
      throw new ConflictException('El usuario ya está activo.');
    }

    return this.repository.reactivate(id);
  }
}