import { Injectable } from '@nestjs/common';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { createUUID } from 'src/shared/helper/system.helper';
import { FilesService } from 'src/core/files/files.service';

@Injectable()
export class PluginFilesService {
  constructor(private readonly filesService: FilesService) {}
  async createKeyFile(body: MerchantInfo) {
    const nameFile = this.buildNameFile();
    const data = Promise.all([
      this.filesService.createFile(nameFile.private, body.privateKey),
      this.filesService.createFile(nameFile.public, body.publicKey),
    ]);
    console.log(
      '🚀 ~ file: file.service.ts:15 ~ PluginFilesService ~ createKeyFile ~ data:',
      data,
    );
  }

  buildNameFile() {
    return {
      private: `${createUUID()}_private.pem`,
      public: `${createUUID()}_public.pem`,
    };
  }
}
