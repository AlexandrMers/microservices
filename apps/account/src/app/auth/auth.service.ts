import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user/entities/user.entity';

import { UserRepository } from '../user/repositories/user.repository';

import { UserRole } from '@courses/interfaces';

import { AccountRegister } from '@courses/contracts';

import {
  ALREADY_HAVE_USER_ERROR,
  WRONG_PASSWORD_OR_LOGIN_ERROR,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(
    dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    const oldUser = this.userRepository.findUser(dto.email);

    if (oldUser) {
      throw new Error(ALREADY_HAVE_USER_ERROR);
    }

    const newUserData = await new UserEntity({
      displayName: dto.displayName,
      email: dto.email,
      role: UserRole.STUDENT,
      passwordHash: '',
    }).setPassword(dto.password);

    const { email, displayName } = await this.userRepository.createUser(
      newUserData
    );

    return { email, displayName };
  }

  public async validateUser(email: string, passwordHash: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error(WRONG_PASSWORD_OR_LOGIN_ERROR);
    }

    const userEntity = new UserEntity(user);
    const isCorrectPassword = userEntity.validatePassword(passwordHash);

    if (!isCorrectPassword) {
      throw new Error(WRONG_PASSWORD_OR_LOGIN_ERROR);
    }

    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
