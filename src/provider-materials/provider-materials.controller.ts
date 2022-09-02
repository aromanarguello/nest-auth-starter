import { JwtAuthGuard } from 'src/auth/guards';
import { ProviderMaterialsService } from './provider-materials.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('provider-materials')
export class ProviderMaterialsController {
  constructor(private providerMaterialService: ProviderMaterialsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getShortform() {
    return this.providerMaterialService.getShortform();
  }

  @Get('/:providerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  findMaterialsByProvider(
    @Param('providerId') providerId: string,
  ): Promise<any> {
    return this.providerMaterialService.findAllByProviderId(providerId);
  }
}
