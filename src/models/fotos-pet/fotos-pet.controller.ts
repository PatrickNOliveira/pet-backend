import { Controller } from '@nestjs/common';
import { FotosPetService } from './fotos-pet.service';

@Controller('fotos-pet')
export class FotosPetController {
  constructor(private readonly fotosPetService: FotosPetService) {}
}
