import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService extends ServiceBase<Usuario> {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {
    super(usuarioRepository);
  }
}
