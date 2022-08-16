import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario/usuario.entity';
import { DefaultMessages } from '../common/types/DefaultMessages';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<Usuario> {
    const user = await this.authService.validateUser({
      email,
      senha,
    });
    if (!user) {
      throw new HttpException(
        DefaultMessages.EMAIL_OR_PASS_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
