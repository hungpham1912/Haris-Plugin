import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

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
}
