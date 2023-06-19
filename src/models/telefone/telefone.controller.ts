import { Controller } from '@nestjs/common';
import { TelefoneService } from './telefone.service';

@Controller('telefone')
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}
}
