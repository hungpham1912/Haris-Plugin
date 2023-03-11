import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateChatDto } from 'src/module/core/chats/dto/create-chat.dto';
import { User } from 'src/module/core/users/entities/user.entity';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
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
}
