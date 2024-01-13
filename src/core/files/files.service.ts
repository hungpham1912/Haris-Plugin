import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { FILE_CONSTANT } from './constants/file.constant';
import { DropboxLogsService } from '../dropbox_logs/dropbox_logs.service';
import { KeyInfo } from '../key_info/entities/key_info.entity';
import {
  buildHeaderGetLink,
  buildHeaderUpload,
  buildParamSendFile,
} from './helper/file.helper';
import { CreateStorageDto } from 'src/module/client/storage/dto/create-storage.dto';
import { v4 as uuidv4 } from 'uuid';
import * as FormData from 'form-data';

const { accessToken } = ENV_CONFIG.dropbox;
const { uploadUrl, getLink } = FILE_CONSTANT;

@Injectable()
export class FilesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly dropboxLogsService: DropboxLogsService,
  ) {}

  async createFile(fileName: string, body: string) {
    try {
      const res = await this.httpService.axiosRef.post(uploadUrl, body, {
        headers: buildHeaderUpload(buildParamSendFile(fileName), accessToken),
      });

      const { data } = res;
      this.dropboxLogsService.create({
        log: data,
        status: res.status,
        url: uploadUrl,
        path: data?.id,
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
        path: error?.response?.id,
      });
      throw error;
    }
  }

  async getTemporaryLink(keyInfo: KeyInfo) {
    try {
      const res = await this.httpService.axiosRef.post(
        getLink,
        { path: keyInfo.file.url },
        {
          headers: buildHeaderGetLink(accessToken),
        },
      );

      const { data } = res;

      this.dropboxLogsService.create({
        log: data,
        status: res.status,
        url: getLink,
        path: keyInfo.file.url,
      });

      return data;
    } catch (error) {
      this.dropboxLogsService.create({
        log: error,
        status: error?.response?.status
          ? error?.response?.status
          : HttpStatus.INTERNAL_SERVER_ERROR,
        url: getLink,
        path: keyInfo.file.url,
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

  async pushFile(file: CreateStorageDto) {
    try {
      const url = `${ENV_CONFIG.storage.baseUrl}upload.php`;
      const form = new FormData();
      form.append('submit', 'Upload Image');
      form.append('fileToUpload', file.buffer, `${uuidv4()}.jpg`);
      const { data } = await this.httpService.axiosRef.post(url, form, {
        maxBodyLength: Infinity,
      });
      if (!data?.success) {
        return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
      }
      return data;
    } catch (error) {
      console.log(
        '🚀 ~ FilesService ~ pushFile ~ error:',
        error?.response?.data,
      );
      throw error;
    }
  }
}
