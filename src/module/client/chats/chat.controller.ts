import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateChatDto } from 'src/core/chats/dto/create-chat.dto';
import { ChatFilter } from 'src/core/chats/models/chat.model';
import { User } from 'src/core/users/entities/user.entity';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { ChatFilterDecor } from 'src/wanders/decorators/chat.decorator';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CliChatsService } from './chat.service';

@ApiTags('Chats')
@Controller()
export class CliChatsController {
  constructor(private readonly cliChatsService: CliChatsService) {}

  @Post('/chats')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async chat(@AuthResponse() user: User, @Body() body: CreateChatDto) {
    try {
      return await this.cliChatsService.createChats(user, body);
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
    name: 'content',
  })
  @Get('conversations/:conversationId/chats')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User chats' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getMessages(
    @Param('conversationId') conversationId: string,
    @Paginate() query: PaginateQuery,
    @ChatFilterDecor() filter: ChatFilter,
  ) {
    try {
      return await this.cliChatsService.getMessages(
        conversationId,
        query,
        filter,
      );
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
