import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './isPublic';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
//TODO: Criar testes unitários para auth.controller
//TODO: Criar testes de integração para auth.controller
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
