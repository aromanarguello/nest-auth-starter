import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtStrategy } from 'src/auth/strategies';
import { CurrentUserId } from 'src/common/decorators';
import { CreateUserProfile } from './dtos/create-user-profile.dto';
import { UserProfileService } from './user-profile.service';

@Controller('user-profile')
export class UserProfileController {
  constructor(private profileService: UserProfileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtStrategy)
  create(@Body() body: CreateUserProfile, @CurrentUserId() userId: string) {
    const profile = { ...body, userId };
    return this.profileService.create(profile);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtStrategy)
  find(@CurrentUserId() userId: string) {
    return this.profileService.findByUserId(userId);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtStrategy)
  update(@Body() body: CreateUserProfile, @CurrentUserId() userId: string) {
    return this.profileService.update(userId, body);
  }
}
