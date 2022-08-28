import { Module } from '@nestjs/common';
import { MaterialFinishController } from './material-finish.controller';
import { MaterialFinishService } from './material-finish.service';

@Module({
  controllers: [MaterialFinishController],
  providers: [MaterialFinishService]
})
export class MaterialFinishModule {}
