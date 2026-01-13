import { Module } from '@nestjs/common';

import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';

@Module({
  providers: [BillboardService],
  controllers: [BillboardController]
})
export class BillboardModule {}
