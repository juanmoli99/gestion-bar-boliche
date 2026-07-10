import { Controller, Get } from '@nestjs/common';
import { ListUsersUseCase } from './list-users.use-case';
import { ListUsersResponseDto } from './dto/list-users.response.dto';

@Controller('users')
export class ListUsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Get()
  async list(): Promise<ListUsersResponseDto[]> {
    return this.listUsersUseCase.execute();
  }
}