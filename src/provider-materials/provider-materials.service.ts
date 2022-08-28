import { ProviderMaterials } from './entities/provider-materials.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderMaterialsService {
  constructor(
    @InjectRepository(ProviderMaterials)
    private providerMaterialsRepository: Repository<ProviderMaterials>,
  ) {}

  findById(id: string): Promise<ProviderMaterials> {
    return this.providerMaterialsRepository.findOne({ where: { id } });
  }
}
