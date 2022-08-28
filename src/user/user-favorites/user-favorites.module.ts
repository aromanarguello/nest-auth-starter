import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/material/entities/material.entity';
import { User } from '../entities/user.entity';
import { UserFavoritesController } from './user-favorites.controller';
import { UserFavoritesService } from './user-favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Material])],
  providers: [UserFavoritesService],
  exports: [UserFavoritesService],
  controllers: [UserFavoritesController],
})
export class UserFavoritesModule {}
