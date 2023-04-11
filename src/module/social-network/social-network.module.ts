import { Module } from '@nestjs/common';
import { SocialFacebookModule } from './facebook/facebook.module';
import { SocialFacebookController } from './facebook/facebook.controller';

@Module({
  imports: [SocialFacebookModule],
  controllers: [SocialFacebookController],
})
export class SocialNetworkModule {}
