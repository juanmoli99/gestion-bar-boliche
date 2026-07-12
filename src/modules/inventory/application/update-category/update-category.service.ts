import { Injectable } from '@nestjs/common';

import { UpdateCategoryUseCase } from './update-category.use-case';
import { UpdateCategoryRequestDto } from './dto/update-category.request.dto';
import { UpdateCategoryResponseDto } from './dto/update-category.response.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateCategoryRequestDto,
  ): Promise<UpdateCategoryResponseDto> {
    return this.updateCategoryUseCase.execute(
      id,
      request,
    );
  }
}