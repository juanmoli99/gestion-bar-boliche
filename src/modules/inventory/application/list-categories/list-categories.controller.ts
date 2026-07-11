import { Controller, Get } from '@nestjs/common';

import { ListCategoriesService } from './list-categories.service';
import { ListCategoriesResponseDto } from './dto/list-categories.response.dto';

@Controller('inventory/categories')
export class ListCategoriesController {
  constructor(
    private readonly listCategoriesService: ListCategoriesService,
  ) {}

  @Get()
  async list(): Promise<ListCategoriesResponseDto[]> {
    return this.listCategoriesService.execute();
  }
}