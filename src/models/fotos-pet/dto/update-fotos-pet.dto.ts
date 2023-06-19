import { PartialType } from '@nestjs/swagger';
import { CreateFotosPetDto } from './create-fotos-pet.dto';

export class UpdateFotosPetDto extends PartialType(CreateFotosPetDto) {}
