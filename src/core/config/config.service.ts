import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService,
  ) {}

  get nodeEnv(): string {
    return this.get<string>('NODE_ENV');
  }

  get port(): number {
    return this.get<number>('PORT');
  }

  get databaseUrl(): string {
    return this.get<string>('DATABASE_URL');
  }

  get directUrl(): string {
    return this.get<string>('DIRECT_URL');
  }

  get jwtSecret(): string {
    return this.get<string>('JWT_SECRET');
  }

  get jwtExpiresIn(): string {
    return this.get<string>('JWT_EXPIRES_IN');
  }

  get<T>(key: string): T {
    const value = this.configService.get<T>(key);

    if (value === undefined || value === null) {
      throw new Error(`La variable ${key} no está configurada.`);
    }

    return value;
  }
}