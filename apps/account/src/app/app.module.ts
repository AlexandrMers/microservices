import { Module } from '@nestjs/common';
import { RMQModule } from 'nestjs-rmq';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// Configs
import { getMongoConfig } from './configs/mongo.config';
import { getRmqConfig } from './configs/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    RMQModule.forRootAsync(getRmqConfig()),
    UserModule,
    AuthModule,
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
