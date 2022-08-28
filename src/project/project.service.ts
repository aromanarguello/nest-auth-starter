import { ProviderMaterialsService } from './../provider-materials/provider-materials.service';
import { Project } from './entities/project.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private providerMaterialService: ProviderMaterialsService,
  ) {}

  create(userId: string, project: CreateProjectDto) {
    return this.projectRepository.save({ ...project, userId });
  }

  findAllByUserId(userId: string) {
    return this.projectRepository.find({ where: { userId } });
  }

  findById(id: string) {
    return this.projectRepository.findOne({ where: { id } });
  }

  delete(id: string) {
    console.log(
      '🚀 ~ file: project.service.ts ~ line 29 ~ ProjectService ~ delete ~ id',
      id,
    );
    try {
      return this.projectRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  }

  async addProviderMaterial(projectId: string, providerMaterialId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    const material = await this.providerMaterialService.findById(
      providerMaterialId,
    );

    project.providerMaterials = [material];

    return this.projectRepository.save(project);
  }
}
