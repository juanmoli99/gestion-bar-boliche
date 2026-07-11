import { Injectable } from '@nestjs/common';

import { ListCategoriesUseCase } from './list-categories.use-case';
import { ListCategoriesResponseDto } from './dto/list-categories.response.dto';

@Injectable()
export class ListCategoriesService {
  constructor(
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  async execute(): Promise<ListCategoriesResponseDto[]> {
    return this.listCategoriesUseCase.execute();
  }
}