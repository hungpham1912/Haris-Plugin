import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Source } from 'src/database/database.config';
import { Merchant } from '../entities/merchant.entity';

@ValidatorConstraint({ async: true })
export class MerchantICodeExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string) {
    const check = await Source.connect()
      .getRepository(Merchant)
      .findOne({
        where: { merchantCode: value },
      });
    if (!check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class SignBodyConstraint implements ValidatorConstraintInterface {
  async validate(value: string) {
    try {
      const body = JSON.parse(value);
      return true;
    } catch (error) {
      console.log('🚀 ~ file: auth-merchant.contraints.ts:30 ~ ', error);
      return false;
    }
  }
}
