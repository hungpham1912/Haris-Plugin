import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { FilesService } from 'src/core/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/shared/decorators/upload';

@ApiTags('Storage')
@Controller('storage')
export class CliStorageController {
  constructor(private readonly fileService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async create(@UploadedFile() file: CreateStorageDto) {
    try {
      return await this.fileService.pushFile(file);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
