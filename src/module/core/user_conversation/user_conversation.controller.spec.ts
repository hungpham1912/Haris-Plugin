import { Test, TestingModule } from '@nestjs/testing';
import { UserConversationController } from './user_conversation.controller';
import { UserConversationService } from './user_conversation.service';

describe('UserConversationController', () => {
  let controller: UserConversationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserConversationController],
      providers: [UserConversationService],
    }).compile();

    controller = module.get<UserConversationController>(UserConversationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
