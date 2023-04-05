import { Module } from '@nestjs/common';
import { KeyInfoService } from './key_info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyInfo } from './entities/key_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyInfo])],
  providers: [KeyInfoService],
  exports: [KeyInfoService],
})
export class KeyInfoModule {}
