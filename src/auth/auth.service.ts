import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../models/usuario/usuario.service';
import { JwtTokenInterface } from '../common/types/auth/jwt.token.interface';
import { JwtPayloadInterface } from '../common/types/auth/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  //TODO: Tipar o retorno dessa função
  async validateUser(params: AuthLoginDto): Promise<any> {
    const user = await this.usersService.findByEmail(params.email);
    if (user && (await argon.verify(user.senha, params.senha))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<JwtTokenInterface> {
    const payload: JwtPayloadInterface = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      escopo: user.escopo,
    };
    return {
      access_token: this.jwtService.sign(payload),
      nome: user.nome,
      email: user.email,
      escopo: user.escopo,
      id: user.id,
    };
  }
}
