import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conversations')
@Controller()
export class CliConversationController {}
