import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talked } from './entities/talked.entity';
import { TalkedService } from './talkeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Talked])],
  providers: [TalkedService],
  exports: [TalkedService],
})
export class TalkedModule {}
