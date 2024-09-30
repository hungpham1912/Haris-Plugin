import { Module } from '@nestjs/common';
import { FilesModule } from 'src/core/files/files.module';

@Module({
  imports: [FilesModule],
  providers: [FilesModule],
  exports: [FilesModule],
})
export class CliStorageModule {}
