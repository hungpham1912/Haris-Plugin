import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { FILE_CONSTANT } from './constants/file.constant';
import { SendFileDto } from './dto/send-file.dto';
import { DropboxLogsService } from '../dropbox_logs/dropbox_logs.service';

const { accessToken, path } = ENV_CONFIG.dropbox;
const { uploadUrl } = FILE_CONSTANT;

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly httpService: HttpService,
    private readonly dropboxLogsService: DropboxLogsService,
  ) {}

  async createFile(fileName: string, body: string) {
    try {
      const res = await this.httpService.axiosRef.post(uploadUrl, body, {
        headers: this.buildHeaderUpload(
          this.buildParamSendFile(fileName),
          accessToken,
        ),
      });

      const { data } = res;
      this.dropboxLogsService.create({
        log: data,
        status: res.status,
        url: uploadUrl,
      });

      return await this.create({
        name: fileName,
        size: data?.size,
        url: data?.id,
      });
    } catch (error) {
      this.dropboxLogsService.create({
        log: error?.response?.data,
        status: error?.response?.status
          ? error?.response?.status
          : HttpStatus.INTERNAL_SERVER_ERROR,
        url: uploadUrl,
      });
      throw error;
    }
  }

  async getTemporaryLink(file: File) {
    try {
      const res = await this.httpService.axiosRef.post(
        uploadUrl,
        { path: file.url },
        {
          headers: this.buildHeaderGetLink(accessToken),
        },
      );

      const { data } = res;
      this.dropboxLogsService.create({
        log: data,
        status: res.status,
        url: uploadUrl,
      });

      return data?.link;
    } catch (error) {
      this.dropboxLogsService.create({
        log: error?.response?.data,
        status: error?.response?.status
          ? error?.response?.status
          : HttpStatus.INTERNAL_SERVER_ERROR,
        url: uploadUrl,
      });
      throw error;
    }
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

  buildHeaderUpload(param: SendFileDto, token: string) {
    return {
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Authorization: `Bearer ${token}`,
      'Dropbox-API-Arg': JSON.stringify(param),
      'Content-Type': 'application/octet-stream',
    };
  }

  buildHeaderGetLink(token: string) {
    return {
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'application/json',
    };
  }
}
