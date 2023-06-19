import { PartialType } from '@nestjs/swagger';
import { CreatePlanoClinicaDto } from './create-plano-clinica.dto';

export class UpdatePlanoClinicaDto extends PartialType(CreatePlanoClinicaDto) {}
