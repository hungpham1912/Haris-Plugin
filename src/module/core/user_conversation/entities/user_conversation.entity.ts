import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

@Entity('user_conversation')
export class UserConversation extends BaseEntity {
  @Column({
    nullable: false,
  })
  nickName: string;

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