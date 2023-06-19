import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Plano } from './entities/plano.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanoService extends ServiceBase<Plano> {
  constructor(
    @InjectRepository(Plano)
    private planoRepository: Repository<Plano>,
  ) {
    super(planoRepository);
  }
}
