import { User } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/material/entities/material.entity';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async create(userId: string, materialId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['materialFavorites'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });

    user.materialFavorites = [material];

    return this.userRepository.save(user);
  }
}
