import { IsNotExist } from './../utils/validators/is-not-exists.validator';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IsExist, IsNotExist, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
