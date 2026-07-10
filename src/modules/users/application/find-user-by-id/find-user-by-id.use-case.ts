import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserByIdRepository } from './find-user-by-id.repository';
import { FindUserByIdResponseDto } from './dto/find-user-by-id.response.dto';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly repository: FindUserByIdRepository,
  ) {}

  async execute(id: string): Promise<FindUserByIdResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    return user;
  }
}