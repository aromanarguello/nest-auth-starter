import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
import { CurrentUserId } from 'src/common/decorators';
import { CreateUserProfile } from './dtos/create-user-profile.dto';
import { UserProfileService } from './user-profile.service';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private profileService: UserProfileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AtGuard)
  create(@Body() body: CreateUserProfile, @CurrentUserId() userId: string) {
    const profile = { ...body, userId };
    return this.profileService.create(profile);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  find(@CurrentUserId() userId: string) {
    return this.profileService.findByUserId(userId);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AtGuard)
  update(@Body() body: CreateUserProfile, @CurrentUserId() userId: string) {
    return this.profileService.update(userId, body);
  }
}
