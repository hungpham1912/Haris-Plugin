import { Module } from '@nestjs/common';
import { SocialFacebookService } from './facebook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5,
    }),
  ],
  providers: [SocialFacebookService],
  exports: [SocialFacebookService],
})
export class SocialFacebookModule {}
