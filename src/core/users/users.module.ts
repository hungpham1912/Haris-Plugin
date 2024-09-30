import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpUsersService } from 'src/module/messenger/operator/users/users.service';
import { CliUserService } from 'src/module/messenger/client/users/user.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, OpUsersService, CliUserService],
  exports: [UsersService, OpUsersService, CliUserService],
})
export class UsersModule {}
