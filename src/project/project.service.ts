import { Project } from './entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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
}
