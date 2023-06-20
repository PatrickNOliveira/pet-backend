import { Module } from '@nestjs/common';
import { PlanoClinicaService } from './plano-clinica.service';
import { PlanoClinicaController } from './plano-clinica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoClinica } from './entities/plano-clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanoClinica])],
  controllers: [PlanoClinicaController],
  providers: [PlanoClinicaService],
  exports: [PlanoClinicaService],
})
export class PlanoClinicaModule {}
