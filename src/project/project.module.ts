import { ProviderMaterialsModule } from './../provider-materials/provider-materials.module';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ProviderMaterialsModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
