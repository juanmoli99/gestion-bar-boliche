import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '../../../../core/config/config.service';
import { AuthPrismaRepository } from '../../infrastructure/repositories/auth.prisma.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly repository: AuthPrismaRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(request: LoginRequestDto): Promise<LoginResponseDto> {
    const usuarioNormalizado = request.usuario.trim().toLowerCase();

    const user = await this.repository.buscarPorUsuario(usuarioNormalizado);

    if (!user || !user.activo) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    const passwordValida = await bcrypt.compare(
      request.contrasena,
      user.contrasenaHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    const payload = {
      sub: user.id,
      usuario: user.usuario,
      rol: user.rol,
    };

    const accessTokenOptions: JwtSignOptions = {
    secret: this.configService.jwtSecret,
    expiresIn: this.configService.jwtExpiresIn as JwtSignOptions['expiresIn'],
    };

    const accessToken = await this.jwtService.signAsync(
    payload,
    accessTokenOptions,
    );

    const refreshToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.jwtSecret,
    expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: user.id,
        nombreCompleto: user.nombreCompleto,
        usuario: user.usuario,
        rol: user.rol,
      },
    };
  }
}