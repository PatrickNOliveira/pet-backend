import { Usuario } from '../../../models/usuario/usuario.entity';

export interface LoginResponseInterface {
  auth: boolean;
  token: string;
  usuario: Usuario;
}
