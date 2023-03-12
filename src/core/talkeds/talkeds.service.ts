import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../conversations/entities/conversation.entity';
import { User } from '../users/entities/user.entity';
import { CreateTalkedDto } from './dto/create-talked.dto';
import { Talked } from './entities/talked.entity';

@Injectable()
export class TalkedService {
  constructor(
    @InjectRepository(Talked)
    private readonly talkedRepository: Repository<Talked>,
  ) {}
  async multipleCreates(user: User[], conversation: Conversation) {
    try {
      const params: CreateTalkedDto[] = [];

      user.forEach((value, i: number) => {
        for (let j = 0; j < user.length; j++) {
          if (i != j) {
            params.push({
              conversationId: conversation.id,
              userId: value.id,
              talkerId: user[j].id,
            });
          }
        }
      });

      return await this.talkedRepository.save(params);
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: any) {
    try {
      return await this.talkedRepository.findOne({ where: query });
    } catch (error) {
      throw error;
    }
  }
}
