import { Test, TestingModule } from '@nestjs/testing';
import { UserConversationService } from './user_conversation.service';

describe('UserConversationService', () => {
  let service: UserConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserConversationService],
    }).compile();

    service = module.get<UserConversationService>(UserConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
