import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { Operator, PaginateBuilder } from 'src/shared/lib/paginate/condition';
import { Repository } from 'typeorm';
import { CHAT_CONSTANT } from './constants/chat.constant';
import { CreateChatParam } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatFilter } from './models/chat.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(create: CreateChatParam) {
    try {
      const param = this.chatRepository.create(create);
      return await this.chatRepository.save(param);
    } catch (error) {
      throw error;
    }
  }

  async paginate(
    limit: number,
    page: number,
    query: PaginateQuery,
    filter: ChatFilter,
    conversationId: string,
  ) {
    try {
      const { alias, column } = CHAT_CONSTANT.paginate;
      return await new PaginateBuilder<Chat>(
        this.chatRepository
          .createQueryBuilder(alias)
          .leftJoinAndSelect(`${alias}.user`, 'user'),
        alias,
      )
        .andWhere(
          column.content,
          filter?.content,
          filter?.content != undefined,
          Operator.LIKE_RIGHT,
        )
        .andWhere(column.conversationId, conversationId, true, Operator.EQ)
        .getPaginate({ limit, page, query });
    } catch (error) {
      throw error;
    }
  }
}
