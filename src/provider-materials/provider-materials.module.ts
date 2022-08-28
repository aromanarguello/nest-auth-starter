import { ProviderMaterials } from './entities/provider-materials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProviderMaterialsService } from './provider-materials.service';
import { ProviderMaterialsController } from './provider-materials.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderMaterials])],
  providers: [ProviderMaterialsService],
  controllers: [ProviderMaterialsController],
  exports: [ProviderMaterialsService],
})
export class ProviderMaterialsModule {}
