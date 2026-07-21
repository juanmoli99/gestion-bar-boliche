import { Injectable } from '@nestjs/common';

import { CreateFreeBarRateUseCase } from './create-free-bar-rate.use-case';
import { CreateFreeBarRateRequestDto } from './dto/create-free-bar-rate.request.dto';
import { CreateFreeBarRateResponseDto } from './dto/create-free-bar-rate.response.dto';

@Injectable()
export class CreateFreeBarRateService {
  constructor(
    private readonly createFreeBarRateUseCase: CreateFreeBarRateUseCase,
  ) {}

  async execute(
    request: CreateFreeBarRateRequestDto,
  ): Promise<CreateFreeBarRateResponseDto> {
    return this.createFreeBarRateUseCase.execute(request);
  }
}