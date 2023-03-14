import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class PluginMerchantController {
  constructor(private readonly cliChatsService: CliChatsService) {}
}
