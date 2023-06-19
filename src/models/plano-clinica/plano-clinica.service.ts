import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { PlanoClinica } from './entities/plano-clinica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanoClinicaService extends ServiceBase<PlanoClinica> {
  constructor(
    @InjectRepository(PlanoClinica)
    private planoClinicaRepository: Repository<PlanoClinica>,
  ) {
    super(planoClinicaRepository);
  }
}
