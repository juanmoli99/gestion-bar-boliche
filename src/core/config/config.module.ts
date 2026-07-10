import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().default(3000),

        DATABASE_URL: Joi.string().required(),

        DIRECT_URL: Joi.string().required(),

        JWT_SECRET: Joi.string().min(32).required(),

        JWT_EXPIRES_IN: Joi.string().default('1d'),
      }),
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useFactory: (config: NestConfigService) =>
        new ConfigService(config),
      inject: [NestConfigService],
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}