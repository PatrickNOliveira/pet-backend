import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../models/usuario/usuario.service';
import { JwtTokenInterface } from '../common/types/auth/jwt.token.interface';
import { JwtPayloadInterface } from '../common/types/auth/jwt.payload.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    const tokenEncoded = await argon.hash(refresh_token);
    await this.usersService.updateRefreshToken(tokenEncoded, user.id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      nome: user.nome,
      email: user.email,
      escopo: user.escopo,
      id: user.id,
    };
  }

  async refresh(body: RefreshTokenDto): Promise<JwtTokenInterface> {
    const user = (await this.usersService.show(body.userId)).data;
    if (!user)
      throw new HttpException(
        {
          error: true,
          message: 'Usuário não encontrado',
          data: null,
        },
        HttpStatus.FORBIDDEN,
      );
    const compare = await argon.verify(user.refreshToken, body.refresh_token);
    if (!compare)
      throw new HttpException(
        {
          error: true,
          message: 'Refresh token inválido',
          data: null,
        },
        HttpStatus.FORBIDDEN,
      );
    await this.jwtService
      .verifyAsync(body.refresh_token, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      })
      .catch(() => {
        throw new HttpException(
          {
            error: true,
            message: 'Refresh token inválido',
            data: null,
          },
          HttpStatus.FORBIDDEN,
        );
      });
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
