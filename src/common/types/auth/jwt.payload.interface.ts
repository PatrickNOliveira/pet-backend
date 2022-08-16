import { EscopoUsuario } from '../EscopoUsuario';

export interface JwtPayloadInterface {
  id: string;
  nome: string;
  email: string;
  escopo: EscopoUsuario;
}
