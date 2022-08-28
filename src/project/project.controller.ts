import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';

import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() project: CreateProjectDto,
    @CurrentUserId() userId: string,
  ) {
    return this.projectService.create(userId, project);
  }

  @Get('/')
  @UseGuards(AtGuard)
  async findAll(@CurrentUserId() userId: string) {
    return this.projectService.findAllByUserId(userId);
  }

  @Delete('/:id')
  @UseGuards(AtGuard)
  deleteProject(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @Get('/:id')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async findOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Patch('/:projectId')
  @UseGuards(AtGuard)
  async addProviderMaterial(
    @Param('projectId') projectId: string,
    @Body() providerMaterialId: string,
  ) {
    return this.projectService.addProviderMaterial(
      projectId,
      providerMaterialId,
    );
  }
}
