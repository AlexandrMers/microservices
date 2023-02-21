import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { JwtModule } from '@nestjs/jwt';

import { ValidationSchemaOfEnvVariables } from './validations/env.validation';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

import { getRmqConfig } from './configs/rmq.config';
import { getJwtConfig } from './configs/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true,
      validationSchema: ValidationSchemaOfEnvVariables,
    }),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
