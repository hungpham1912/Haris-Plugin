import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { FILE_CONSTANT } from './constants/file.constant';
import { SendFileDto } from './dto/send-file.dto';

const { accessToken, baseUrl, path } = ENV_CONFIG.dropbox;
const { uploadUrl } = FILE_CONSTANT;

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly httpService: HttpService,
  ) {}

  async sendFile(fileName: string, body: string) {
    const res = await this.httpService.axiosRef.post(uploadUrl, body, {
      headers: this.buildHeader(
        this.buildParamSendFile(fileName),
        ENV_CONFIG.dropbox.accessToken,
      ),
    });
  }

  async create(create: CreateFileDto) {
    try {
      return await this.fileRepository.save(create);
    } catch (error) {
      throw error;
    }
  }

  buildParamSendFile(name: string): SendFileDto {
    return {
      autorename: false,
      mode: 'add',
      mute: false,
      path: `${path}${name}`,
      strict_conflict: false,
    };
  }

  buildHeader(param: SendFileDto, token: string) {
    return {
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify(param),
      'Content-Type': 'application/octet-stream',
    };
  }
}
