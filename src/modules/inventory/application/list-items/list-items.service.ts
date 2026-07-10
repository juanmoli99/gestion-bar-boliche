import { Injectable } from '@nestjs/common';
import { ListItemsUseCase } from './list-items.use-case';
import { ListItemsResponseDto } from './dto/list-items.response.dto';

@Injectable()
export class ListItemsService {
  constructor(
    private readonly listItemsUseCase: ListItemsUseCase,
  ) {}

  async execute(): Promise<ListItemsResponseDto[]> {
    return this.listItemsUseCase.execute();
  }
}