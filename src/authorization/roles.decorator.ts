import { SetMetadata } from '@nestjs/common';
import { EscopoUsuario } from '../common/types/EscopoUsuario';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EscopoUsuario[][]) =>
  SetMetadata(ROLES_KEY, roles);
