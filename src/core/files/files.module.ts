import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { DropboxLogsService } from '../dropbox_logs/dropbox_logs.service';
import { DropboxLog } from '../dropbox_logs/entities/dropbox_log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File, DropboxLog]),
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5,
    }),
  ],
  providers: [FilesService, DropboxLogsService],
  exports: [FilesService, DropboxLogsService],
})
export class FilesModule {}
