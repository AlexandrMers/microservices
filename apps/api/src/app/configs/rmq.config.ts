import { IRMQServiceAsyncOptions } from 'nestjs-rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceOptions } from 'nestjs-rmq/dist/interfaces/rmq-options.interface';

export const getRmqConfig = (): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): IRMQServiceOptions => ({
    exchangeName: configService.get<string>('AMQP_EXCHANGE'),
    connections: [
      {
        login: configService.get<string>('AMQP_USER'),
        password: configService.get<string>('AMQP_PASSWORD'),
        host: configService.get<string>('AMQP_HOST'),
      },
    ],
    queueName: configService.get<string>('AMQP_QUEUE'),
    prefetchCount: 32,
    serviceName: 'account',
    assertExchangeType: 'topic',
  }),
});
