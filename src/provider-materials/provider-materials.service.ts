import { ProviderMaterials } from './entities/provider-materials.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ProviderMaterialsService {
  constructor(
    @InjectRepository(ProviderMaterials)
    private providerMaterialsRepository: Repository<ProviderMaterials>,
  ) {}

  findById(id: string): Promise<ProviderMaterials> {
    return this.providerMaterialsRepository.findOne({ where: { id } });
  }

  findAllByProviderId(providerId: string): Promise<ProviderMaterials[]> {
    return this.providerMaterialsRepository.find({ where: { providerId } });
  }

  findAll(options?: FindManyOptions): Promise<ProviderMaterials[]> {
    return this.providerMaterialsRepository.find(options);
  }

  async getShortform() {
    const providerMaterials = await this.providerMaterialsRepository
      .createQueryBuilder('PM')
      .leftJoinAndSelect('PM.material', 'M')
      .select([
        'PM.id',
        'PM.price',
        'PM.metaTitle',
        'PM.imageUrl',
        'PM.color',
        'M.name',
      ])
      .getMany();

    const shortform = providerMaterials.map((providerMaterial) => ({
      ...providerMaterial,
      material: providerMaterial.material.name,
    }));

    return shortform;
  }
}
