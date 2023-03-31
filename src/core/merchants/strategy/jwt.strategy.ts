import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthMerchantStrategy, Payload } from 'src/core/auth/models/auth.model';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { Source } from 'src/database/database.config';
import { Merchant } from '../entities/merchant.entity';

@Injectable()
export class JwtMerchantStrategy extends PassportStrategy(
  Strategy,
  AuthMerchantStrategy.JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ENV_CONFIG.jwt.secret,
    });
  }

  async validate(payload: Payload) {
    const merchant = await Source.connect()
      .getRepository(Merchant)
      .findOne({
        where: { id: payload.id },
      });

    if (!merchant) return false;
    return merchant;
  }
}
