import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

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
  conversationId: string;
}

export class CreateChatParam extends CreateChatDto {
  userId: string;
}
