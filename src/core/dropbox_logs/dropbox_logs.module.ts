import { Module } from '@nestjs/common';
import { DropboxLogsService } from './dropbox_logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropboxLog } from './entities/dropbox_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DropboxLog])],
  providers: [DropboxLogsService],
  exports: [DropboxLogsService],
})
export class DropboxLogsModule {}
