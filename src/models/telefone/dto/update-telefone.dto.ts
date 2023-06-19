import { PartialType } from '@nestjs/swagger';
import { CreateTelefoneDto } from './create-telefone.dto';

export class UpdateTelefoneDto extends PartialType(CreateTelefoneDto) {}
