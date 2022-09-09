import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateUserDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password, role }: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository
      .create({
        email,
        password: hashedPassword,
        role,
      })
      .save();
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async updateToken(userId: string, rt: string | null): Promise<boolean> {
    this.userRepository.update(userId, { refreshToken: rt });
    return true;
  }
}
