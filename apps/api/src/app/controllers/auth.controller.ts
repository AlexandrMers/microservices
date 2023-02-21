import { Body, Controller, Post } from '@nestjs/common';

import { AccountLogin, AccountRegister } from '@courses/contracts';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(@Body() dto: AccountRegister.Request) {
    return null;
  }

  @Post('login')
  async login(@Body() dto: AccountLogin.Request) {
    return null;
  }
}
