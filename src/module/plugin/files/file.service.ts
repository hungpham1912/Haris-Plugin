import { Injectable } from '@nestjs/common';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { FilesService } from 'src/core/files/files.service';
import { CreateKeyInfoDto } from 'src/core/key_info/dto/create-key_info.dto';
import { KeyType } from 'src/core/key_info/entities/key_info.entity';
import { KeyInfoService } from 'src/core/key_info/key_info.service';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { LinkKeyFileResponse } from './models/file.model';

@Injectable()
export class PluginFilesService {
  constructor(
    private readonly filesService: FilesService,
    private readonly keyInfoService: KeyInfoService,
  ) {}

  async uploadAndGetLink(body: MerchantInfo) {
    try {
      await this.createKeyFile(body);
      return await this.getLinkKeyFile(body);
    } catch (error) {
      throw error;
    }
  }

  async createKeyFile(body: MerchantInfo) {
    try {
      const nameFile = this.buildNameFile(body.merchantId);
      const data = await Promise.all([
        this.filesService.createFile(nameFile.private, body.privateKey),
        this.filesService.createFile(nameFile.public, body.publicKey),
      ]);

      const params: CreateKeyInfoDto[] = data.map((value) => {
        if (value.name.slice(0, 7) === KeyType.PRIVATE)
          return {
            fileId: value.id,
            merchantId: body.merchantId,
            type: KeyType.PRIVATE,
          };

        return {
          fileId: value.id,
          merchantId: body.merchantId,
          type: KeyType.PUBLIC,
        };
      });

      await this.keyInfoService.create(params);
    } catch (error) {
      throw error;
    }
  }

  async getLinkKeyFile(body: MerchantInfo): Promise<LinkKeyFileResponse> {
    try {
      const keysInfo = await this.keyInfoService.find({
        merchantId: body.merchantId,
      });
      if (keysInfo.length > 2) throw BASE_ERROR[0];
      const data = await Promise.all([
        this.filesService.getTemporaryLink(keysInfo[0]),
        this.filesService.getTemporaryLink(keysInfo[1]),
      ]);
      const result: LinkKeyFileResponse = {
        linkPrivate: '',
        linkPublic: '',
      };
      data.forEach((value) => {
        if (value.metadata.name.slice(0, 7) === KeyType.PRIVATE)
          result.linkPrivate = value?.link;
        result.linkPublic = value?.link;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  buildNameFile(merchantId: string) {
    return {
      private: `${KeyType.PRIVATE}_${merchantId}.pem`,
      public: `${KeyType.PUBLIC}_${merchantId}.pem`,
    };
  }
}
