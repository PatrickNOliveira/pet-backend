import { Module } from '@nestjs/common';
import { PlanoClinicaService } from './plano-clinica.service';
import { PlanoClinicaController } from './plano-clinica.controller';

@Module({
  controllers: [PlanoClinicaController],
  providers: [PlanoClinicaService]
})
export class PlanoClinicaModule {}
