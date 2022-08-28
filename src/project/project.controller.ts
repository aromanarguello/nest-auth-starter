import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @Get('/:id')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async findOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }
}
