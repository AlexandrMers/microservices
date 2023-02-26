import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

import { AccountLogin, AccountRegister } from '@courses/contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
