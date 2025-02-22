import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';

@Module({
  providers: [SizeService],
  controllers: [SizeController]
})
export class SizeModule {}
