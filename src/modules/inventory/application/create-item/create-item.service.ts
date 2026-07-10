import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from './dto/create-item.request.dto';
import { CreateItemResponseDto } from './dto/create-item.response.dto';
import { CreateItemUseCase } from './create-item.use-case';

@Injectable()
export class CreateItemService {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
  ) {}

  async execute(
    request: CreateItemRequestDto,
  ): Promise<CreateItemResponseDto> {
    return this.createItemUseCase.execute(request);
  }
}