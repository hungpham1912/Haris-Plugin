import { Injectable } from '@nestjs/common';
import { RegisterMerchantUserDto } from 'src/core/auth/dto/auth.dto';

@Injectable()
export class PluginAuthService {
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }
}
