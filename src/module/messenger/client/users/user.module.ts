import { Module } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersModule],
  exports: [UsersModule],
})
export class CliUserModule {}
