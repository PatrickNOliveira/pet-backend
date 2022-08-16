import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ROLES_KEY } from '../../authorization/roles.decorator';
import { EscopoUsuario } from '../types/EscopoUsuario';
import { DefaultMessages } from '../types/DefaultMessages';
import { JwtTokenInterface } from '../types/auth/jwt.token.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EscopoUsuario[][]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const data = context.switchToHttp().getRequest();
    const token = data.headers.authorization;
    const tokenJWT = token && token.split(' ')[1];
    const payload = jwt.decode(tokenJWT) as JwtTokenInterface;
    if (requiredRoles.some((role) => role.includes(payload.escopo))) {
      return true;
    }
    throw new HttpException(
      {
        error: true,
        message: DefaultMessages.NOT_AUTHORIZED,
        data: null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
