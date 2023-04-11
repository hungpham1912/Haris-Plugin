import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { Public } from 'src/wanders/decorators/public.decorator';
import { SocialFacebookService } from './facebook.service';

@ApiTags('Facebook')
@Controller('facebook')
export class SocialFacebookController {
  constructor(private readonly socialFacebookService: SocialFacebookService) {}

  @Post('demo')
  @Public()
  async demo() {
    try {
      return await this.socialFacebookService.demo();
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
