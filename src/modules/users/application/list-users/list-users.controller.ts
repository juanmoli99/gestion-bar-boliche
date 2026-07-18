import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  RolUsuario,
} from '../../../../generated/prisma/enums';

import {
  Roles,
} from '../../../../shared/decorators/roles.decorator';

import {
  ListUsersUseCase,
} from './list-users.use-case';

import {
  ListUsersResponseDto,
} from './dto/list-users.response.dto';

@Controller('users')
export class ListUsersController {
  constructor(
    private readonly listUsersUseCase:
      ListUsersUseCase,
  ) {}

  @Roles(
    RolUsuario.ADMINISTRADOR,
  )
  @Get()
  async list(): Promise<
    ListUsersResponseDto[]
  > {
    return this.listUsersUseCase.execute();
  }
}