import { Injectable } from '@nestjs/common';

import { UpdateFreeBarRateUseCase } from './update-free-bar-rate.use-case';
import { UpdateFreeBarRateRequestDto } from './dto/update-free-bar-rate.request.dto';
import { UpdateFreeBarRateResponseDto } from './dto/update-free-bar-rate.response.dto';

@Injectable()
export class UpdateFreeBarRateService {
  constructor(
    private readonly updateFreeBarRateUseCase: UpdateFreeBarRateUseCase,
  ) {}

  async execute(
    id: string,
    request: UpdateFreeBarRateRequestDto,
  ): Promise<UpdateFreeBarRateResponseDto> {
    return this.updateFreeBarRateUseCase.execute(
      id,
      request,
    );
  }
}