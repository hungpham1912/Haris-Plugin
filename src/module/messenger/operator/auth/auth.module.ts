import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/core/auth/auth.service';
import { ManagersModule } from 'src/core/managers/managers.module';
import { OpeAuthService } from './auth.service';
import { JwtManagerStrategy } from './strategy/jwt.strategy';
import { LocalManagerStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, ManagersModule],
  providers: [
    ManagersModule,
    AuthService,
    OpeAuthService,
    JwtService,
    LocalManagerStrategy,
    JwtManagerStrategy,
  ],
  exports: [
    ManagersModule,
    AuthService,
    OpeAuthService,
    JwtService,
    LocalManagerStrategy,
    JwtManagerStrategy,
  ],
})
export class OpeAuthModule {}
