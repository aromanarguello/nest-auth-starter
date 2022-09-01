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
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUserId } from 'src/common/decorators';

import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() project: CreateProjectDto, @CurrentUserId() userId: string) {
    return this.projectService.create(userId, project);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUserId() userId: string) {
    return this.projectService.findAllByUserId(userId);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async findOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProject(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async addProviderMaterial(
    @Param('id') id: string,
    @Body() providerMaterialId: string,
  ) {
    return this.projectService.addProviderMaterial(id, providerMaterialId);
  }
}
