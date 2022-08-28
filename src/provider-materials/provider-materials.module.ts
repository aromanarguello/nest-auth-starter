import { Module } from '@nestjs/common';
import { ProviderMaterialsService } from './provider-materials.service';
import { ProviderMaterialsController } from './provider-materials.controller';

@Module({
  providers: [ProviderMaterialsService],
  controllers: [ProviderMaterialsController],
})
export class ProviderMaterialsModule {}
