import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserConversationService } from './user_conversation.service';
import { CreateUserConversationDto } from './dto/create-user_conversation.dto';
import { UpdateUserConversationDto } from './dto/update-user_conversation.dto';

@Controller('user-conversation')
export class UserConversationController {
  constructor(private readonly userConversationService: UserConversationService) {}

  @Post()
  create(@Body() createUserConversationDto: CreateUserConversationDto) {
    return this.userConversationService.create(createUserConversationDto);
  }

  @Get()
  findAll() {
    return this.userConversationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userConversationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserConversationDto: UpdateUserConversationDto) {
    return this.userConversationService.update(+id, updateUserConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userConversationService.remove(+id);
  }
}
