import { Module } from '@nestjs/common';
import { MaterialUsageController } from './material-usage.controller';

@Module({
  controllers: [MaterialUsageController],
})
export class MaterialUsageModule {}
