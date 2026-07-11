import { Injectable } from '@nestjs/common';

import { CreateCategoryUseCase } from './create-category.use-case';
import { CreateCategoryRequestDto } from './dto/create-category.request.dto';
import { CreateCategoryResponseDto } from './dto/create-category.response.dto';

@Injectable()
export class CreateCategoryService {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
  ) {}

  async execute(
    request: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.createCategoryUseCase.execute(request);
  }
}