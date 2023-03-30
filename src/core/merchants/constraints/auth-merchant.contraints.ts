import {
  isUUID,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Source } from 'src/database/database.config';
import { Merchant } from '../entities/merchant.entity';

@ValidatorConstraint({ async: true })
export class SignBodyConstraint implements ValidatorConstraintInterface {
  async validate(value: any) {
    try {
      // const body = JSON.parse(value);
      return true;
    } catch (error) {
      console.log('🚀 ~ file: auth-merchant.contraints.ts:30 ~ ', error);
      return false;
    }
  }
}

@ValidatorConstraint({ async: true })
export class MerchantExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments?: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(Merchant)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class MerchantNotExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string, validationArguments?: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(Merchant)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (!check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class MerchantIdNotExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string) {
    if (!isUUID(value)) return false;
    const check = await Source.connect()
      .getRepository(Merchant)
      .findOne({
        where: { id: value },
      });
    if (!check) return false;
    return true;
  }
}
