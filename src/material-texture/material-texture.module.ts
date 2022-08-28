import { Module } from '@nestjs/common';
import { MaterialTextureController } from './material-texture.controller';
import { MaterialTextureService } from './material-texture.service';

@Module({
  controllers: [MaterialTextureController],
  providers: [MaterialTextureService],
})
export class MaterialTextureModule {}
