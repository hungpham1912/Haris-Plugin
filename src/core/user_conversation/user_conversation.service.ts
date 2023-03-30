import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { Operator, PaginateBuilder } from 'src/shared/lib/paginate/condition';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ConversationFilter } from '../conversations/models/conversation.model';
import { User } from '../users/entities/user.entity';
import { USER_CONVERSATION_CONSTANT } from './constants/user_conversation.constant';
import { CreateUserConversationParam } from './dto/create-user_conversation.dto';
import { UserConversation } from './entities/user_conversation.entity';

@Injectable()
export class UserConversationService {
  constructor(
    @InjectRepository(UserConversation)
    private readonly userConversationRepository: Repository<UserConversation>,
  ) {}

  async multipleCreates(create: CreateUserConversationParam[]) {
    try {
      const param = this.userConversationRepository.create(create);
      return await this.userConversationRepository.save(param);
    } catch (error) {
      throw error;
    }
  }

  async paginate(
    limit: number,
    page: number,
    query: PaginateQuery,
    filter: ConversationFilter,
    user: User,
  ) {
    try {
      const { alias, column } = USER_CONVERSATION_CONSTANT.paginate;
      return await new PaginateBuilder<UserConversation>(
        this.userConversationRepository
          .createQueryBuilder(alias)
          .leftJoinAndSelect(`${alias}.conversation`, 'conversation'),
        alias,
      )
        .andWhere(
          column.showName,
          filter?.showName,
          filter?.showName != undefined,
          Operator.LIKE_RIGHT,
        )
        .andWhere(column.userId, user.id, true, Operator.EQ)
        .getPaginate({ limit, page, query });
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: FindOptionsWhere<UserConversation>) {
    try {
      return await this.userConversationRepository.findOne({ where: query });
    } catch (error) {
      throw error;
    }
  }
}
