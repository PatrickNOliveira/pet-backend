import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService extends ServiceBase<Pet> {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {
    super(petRepository);
  }
}
