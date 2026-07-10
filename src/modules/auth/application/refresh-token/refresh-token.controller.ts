import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokenRequestDto } from './dto/refresh-token.request.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.response.dto';
import { RefreshTokenService } from './refresh-token.service';
import { Public } from '../../../../shared/decorators/public.decorator';

@Controller('auth')
export class RefreshTokenController {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Public()
  @Post('refresh-token')
  async refreshToken(
    @Body() request: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.refreshTokenService.execute(request);
  }
}