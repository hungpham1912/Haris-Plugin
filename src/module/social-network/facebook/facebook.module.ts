import { Module } from '@nestjs/common';
import { SocialFacebookService } from './facebook.service';

@Module({
  imports: [],
  providers: [SocialFacebookService],
  exports: [SocialFacebookService],
})
export class SocialFacebookModule {}
