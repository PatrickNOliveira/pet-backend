import { EscopoUsuario } from '../EscopoUsuario';

export interface JwtTokenInterface {
  access_token: string;
  nome: string;
  email: string;
  id: string;
  escopo: EscopoUsuario;
}
