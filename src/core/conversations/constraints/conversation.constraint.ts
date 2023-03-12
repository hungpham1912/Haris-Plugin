import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Source } from 'src/database/database.config';
import { In } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Conversation } from '../entities/conversation.entity';

@ValidatorConstraint({ async: true })
export class ConversationExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: string) {
    const check = await Source.connect()
      .getRepository(Conversation)
      .findOne({
        where: { id: value },
      });
    if (!check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class UserIdsConstraint implements ValidatorConstraintInterface {
  async validate(value: string[]) {
    if (value.length < 1) return false;
    const check = await Source.connect()
      .getRepository(User)
      .count({
        where: { id: In(value) },
      });
    if (check < value.length) return false;
    return true;
  }
}
