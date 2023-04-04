import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
