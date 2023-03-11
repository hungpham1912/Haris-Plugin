import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('chats')
export class Chat extends BaseEntity {
  @Column({
    nullable: false,
    length: 5000,
  })
  content: string;

  @Column({
    nullable: true,
    length: 1000,
  })
  fileUrl: string;
}
