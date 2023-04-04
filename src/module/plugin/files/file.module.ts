import { Module } from '@nestjs/common';
import { PluginFilesService } from './file.service';
import { FilesModule } from 'src/core/files/files.module';

@Module({
  imports: [FilesModule],
  providers: [PluginFilesService, FilesModule],
})
export class PluginFilesModule {}
