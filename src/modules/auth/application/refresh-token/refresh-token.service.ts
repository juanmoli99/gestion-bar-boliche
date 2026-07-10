import { Injectable } from '@nestjs/common';
import { RefreshTokenRequestDto } from './dto/refresh-token.request.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.response.dto';
import { RefreshTokenUseCase } from './refresh-token.use-case';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async execute(
    request: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.refreshTokenUseCase.execute(request);
  }
}