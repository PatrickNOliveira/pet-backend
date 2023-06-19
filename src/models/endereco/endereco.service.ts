import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Endereco } from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnderecoService extends ServiceBase<Endereco> {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {
    super(enderecoRepository);
  }
}
