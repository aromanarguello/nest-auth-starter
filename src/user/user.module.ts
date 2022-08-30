import { UserProfileModule } from './user-profile/user-profile.module';
import { IsNotExist } from './../utils/validators/is-not-exists.validator';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';

import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { UserFavoritesModule } from './user-favorites/user-favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserSettingsModule,
    UserFavoritesModule,
    UserProfileModule,
  ],
  providers: [IsExist, IsNotExist, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
