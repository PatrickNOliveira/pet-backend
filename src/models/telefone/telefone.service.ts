import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Telefone } from './entities/telefone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TelefoneService extends ServiceBase<Telefone> {
  constructor(
    @InjectRepository(Telefone)
    private telefoneRepository: Repository<Telefone>,
  ) {
    super(telefoneRepository);
  }
}
