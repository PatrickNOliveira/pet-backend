import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './empresa.entity';
import { ServiceBase } from '../../common/utils/service.base';

@Injectable()
export class EmpresaService extends ServiceBase<Empresa> {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {
    super(empresaRepository);
  }
}
