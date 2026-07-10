import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '../../../../core/config/config.service';

import { RefreshTokenRequestDto } from './dto/refresh-token.request.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.response.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    request: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(request.refreshToken, {
        secret: this.configService.jwtSecret,
      });

      const newPayload = {
        sub: payload.sub,
        usuario: payload.usuario,
        rol: payload.rol,
      };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: this.configService.jwtSecret,
        expiresIn:
          this.configService.jwtExpiresIn as import('@nestjs/jwt').JwtSignOptions['expiresIn'],
      });

      const refreshToken = await this.jwtService.signAsync(newPayload, {
        secret: this.configService.jwtSecret,
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Refresh Token inválido.');
    }
  }
}