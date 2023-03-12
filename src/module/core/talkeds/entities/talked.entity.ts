import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, ManyToOne } from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

export class Talked extends BaseEntity {
  @Column({ nullable: false })
  talkerId: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  talker: User;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  conversationId: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.id, {
    eager: true,
  })
  conversation: Conversation;
}
