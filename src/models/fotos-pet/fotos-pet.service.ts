import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { FotosPet } from './entities/fotos-pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';

@Injectable()
export class FotosPetService extends ServiceBase<FotosPet> {
  constructor(
    @InjectRepository(FotosPet)
    private fotosPetRepository: Repository<FotosPet>,
    private amazonS3Service: AwsService,
  ) {
    super(fotosPetRepository);
  }

  async create(
    file: Express.Multer.File,
    body: Partial<FotosPet>,
  ): Promise<IResponsePadrao<FotosPet>> {
    const responseBucket = await this.amazonS3Service.uploadFile(file);
    return super.store({
      petId: body.petId,
      url: responseBucket.Location,
    });
  }
}
