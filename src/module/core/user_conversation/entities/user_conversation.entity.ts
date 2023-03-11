import { Column, Entity } from 'typeorm';

@Entity('user_conversation')
export class UserConversation {
  @Column({
    nullable: false,
  })
  nickName: string;
}
