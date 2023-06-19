import { Controller } from '@nestjs/common';
import { PlanoClinicaService } from './plano-clinica.service';

@Controller('plano-clinica')
export class PlanoClinicaController {
  constructor(private readonly planoClinicaService: PlanoClinicaService) {}
}
