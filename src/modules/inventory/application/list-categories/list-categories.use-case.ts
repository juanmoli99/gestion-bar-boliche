import { Injectable } from '@nestjs/common';

import { ListCategoriesRepository } from './list-categories.repository';
import { ListCategoriesResponseDto } from './dto/list-categories.response.dto';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    private readonly repository: ListCategoriesRepository,
  ) {}

  async execute(): Promise<ListCategoriesResponseDto[]> {
    return this.repository.findAll();
  }
}