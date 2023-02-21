import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Get('info')
  async info(@UserId() userId: string) {
    return userId;
  }
}
