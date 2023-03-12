import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, Validate } from 'class-validator';
import { UserIdsConstraint } from '../constraints/conversation.constraint';
import { CONVERSATION_BAD_RQ_ERROR } from '../errors/conversations.error';

export class CreateConversationDto {
  @ApiProperty({
    example: [],
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @Validate(UserIdsConstraint, { message: CONVERSATION_BAD_RQ_ERROR[1] })
  userIds: string[];
}

export class CreateConversationParam {
  type: string;
  backgroundUrl: string;
}
