import { Injectable } from '@nestjs/common';
import { ListUsersRepository } from './list-users.repository';
import { ListUsersResponseDto } from './dto/list-users.response.dto';

@Injectable()
export class ListUsersUseCase {
  constructor(
    private readonly repository: ListUsersRepository,
  ) {}

  async execute(): Promise<ListUsersResponseDto[]> {
    return this.repository.findAll();
  }
}