import { Injectable } from '@nestjs/common';

import { UpdateItemUseCase } from './update-item.use-case';
import { UpdateItemRequestDto } from './dto/update-item.request.dto';
import { UpdateItemResponseDto } from './dto/update-item.response.dto';

@Injectable()
export class UpdateItemService {
  constructor(
    private readonly updateItemUseCase: UpdateItemUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateItemRequestDto,
  ): Promise<UpdateItemResponseDto> {
    return this.updateItemUseCase.execute(id, request);
  }
}