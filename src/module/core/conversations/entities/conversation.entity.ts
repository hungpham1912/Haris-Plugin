import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum ConversationType {
  DUO = 'DUO',
  GROUP = 'GROUP',
}
@Entity('conversations')
export class Conversation extends BaseEntity {
  @Column({
    nullable: false,
    default: ENV_CONFIG.source.user.defaultAvatar,
    length: 5000,
  })
  backgroundUrl: string;

  @Column({
    nullable: false,
    default: ConversationType.DUO,
  })
  type: string;
}
