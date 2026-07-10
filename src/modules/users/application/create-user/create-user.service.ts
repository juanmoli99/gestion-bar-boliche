import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { CreateUserUseCase } from './create-user.use-case';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.createUserUseCase.execute(request);
  }
}