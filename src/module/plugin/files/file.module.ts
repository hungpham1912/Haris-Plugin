import { Module } from '@nestjs/common';
import { PluginFilesService } from './file.service';
import { FilesModule } from 'src/core/files/files.module';
import { KeyInfoModule } from 'src/core/key_info/key_info.module';

@Module({
  imports: [FilesModule, KeyInfoModule],
  providers: [PluginFilesService, FilesModule, KeyInfoModule],
  exports: [PluginFilesService, FilesModule, KeyInfoModule],
})
export class PluginFilesModule {}
