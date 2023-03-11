import { Injectable } from '@nestjs/common';
import { CreateUserConversationDto } from './dto/create-user_conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user_conversation.dto';

@Injectable()
export class UserConversationService {
  create(createUserConversationDto: CreateUserConversationDto) {
    return 'This action adds a new userConversation';
  }

  findAll() {
    return `This action returns all userConversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userConversation`;
  }

  update(id: number, updateUserConversationDto: UpdateUserConversationDto) {
    return `This action updates a #${id} userConversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userConversation`;
  }
}
