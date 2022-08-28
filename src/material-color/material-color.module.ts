import { Module } from '@nestjs/common';
import { MaterialColorController } from './material-color.controller';
import { MaterialColorService } from './material-color.service';

@Module({
  controllers: [MaterialColorController],
  providers: [MaterialColorService]
})
export class MaterialColorModule {}
