import { Module } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';

@Module({
  imports: [UsersModule],
  exports: [UsersModule],
  providers: [UsersModule],
})
export class OpUsersModule {}
