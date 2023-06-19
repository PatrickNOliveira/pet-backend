import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Clinica } from './entities/clinica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicaService extends ServiceBase<Clinica> {
  constructor(
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>,
  ) {
    super(clinicaRepository);
  }
}
