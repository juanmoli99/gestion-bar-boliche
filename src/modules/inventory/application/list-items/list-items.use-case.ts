import { Injectable } from '@nestjs/common';
import { ListItemsRepository } from './list-items.repository';
import { ListItemsResponseDto } from './dto/list-items.response.dto';

@Injectable()
export class ListItemsUseCase {
  constructor(
    private readonly repository: ListItemsRepository,
  ) {}

  async execute(): Promise<ListItemsResponseDto[]> {
    return this.repository.findAll();
  }
}