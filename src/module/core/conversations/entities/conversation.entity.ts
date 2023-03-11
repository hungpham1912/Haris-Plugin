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
    length: 5000,
  })
  backgroundUrl: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    default: ConversationType.DUO,
  })
  type: string;
}
