import { UserProfile } from 'src/user/user-profile/entities/user-profile.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserProfile } from './dtos/create-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  create(profile: CreateUserProfile) {
    return this.userProfileRepository.save(profile);
  }

  async findByUserId(userId: string) {
    const user = await this.userProfileRepository.findOne({
      where: { userId },
    });

    const profile = {
      firstName: user.firstName,
      lastName: user.lastName,

      imageUrl: user.imageUrl,
    };
    return profile;
  }

  update(userId: string, profile: CreateUserProfile) {
    return this.userProfileRepository.update(userId, profile);
  }
}
