import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { FotosPet } from './entities/fotos-pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FotosPetService extends ServiceBase<FotosPet> {
  constructor(
    @InjectRepository(FotosPet)
    private fotosPetRepository: Repository<FotosPet>,
  ) {
    super(fotosPetRepository);
  }
}
