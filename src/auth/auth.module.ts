import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../models/usuario/usuario.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_AUTH_TOKEN_EXPIRATION_TIME,
      },
    }),
    UsuarioModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
