import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateConversationDto } from 'src/core/conversations/dto/create-conversation.dto';
import { ConversationFilter } from 'src/core/conversations/models/conversation.model';
import { User } from 'src/core/users/entities/user.entity';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { ConversationFilterDecor } from 'src/wanders/decorators/conversation.decorator';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CliConversationService } from './conversation.service';

@ApiTags('Conversations')
@Controller()
export class CliConversationController {
  constructor(
    private readonly cliConversationService: CliConversationService,
  ) {}

  @Post('/conversations')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createConversation(
    @AuthResponse() user: User,
    @Body() body: CreateConversationDto,
  ) {
    try {
      return await this.cliConversationService.create(user, body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @ApiQuery({
    example: 1,
    name: 'page',
  })
  @ApiQuery({
    example: 10,
    name: 'limit',
  })
  @ApiQuery({
    example: 10,
    name: 'showName',
  })
  @Get('/conversations')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getConversation(
    @AuthResponse() user: User,
    @Paginate() query: PaginateQuery,
    @ConversationFilterDecor() filter: ConversationFilter,
  ) {
    try {
      return await this.cliConversationService.getConversation(
        user,
        query,
        filter,
      );
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
