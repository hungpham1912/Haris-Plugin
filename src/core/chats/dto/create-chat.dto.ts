import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { ConversationExistConstraint } from '../../conversations/constraints/conversation.constraint';
import { CHAT_BAD_RQ_ERROR } from '../errors/chat.error';

export class CreateChatDto {
  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @IsOptional()
  fileUrl: string;

  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Validate(ConversationExistConstraint, { message: CHAT_BAD_RQ_ERROR[1] })
  conversationId: string;
}

export class CreateChatParam extends CreateChatDto {
  userId: string;
}
