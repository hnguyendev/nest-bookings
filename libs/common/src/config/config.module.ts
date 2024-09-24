import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
