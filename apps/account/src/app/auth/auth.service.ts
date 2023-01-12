import { Injectable } from '@nestjs/common';

import { UserRepository } from '../user/repositories/user.repository';

import { UserRole } from '@courses/interfaces';

import { UserEntity } from '../user/entities/user.entity';

import { RegisterDto } from './dto/register.dto';

import { ALREADY_HAVE_USER_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: RegisterDto) {
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

    return this.userRepository.createUser(newUserData);
  }

  public async validateUser(email: string, passwordHash: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    const userEntity = new UserEntity(user);
    const isCorrectPassword = userEntity.validatePassword(passwordHash);

    if (!isCorrectPassword) {
      throw new Error('Неверный логин или пароль');
    }

    return { id: user._id };
  }
}
