import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}

  @Post()
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicaService.store(createClinicaDto);
  }

  @Get()
  findAll() {
    return this.clinicaService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicaService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaService.update({
      condition: { id },
      body: updateClinicaDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicaService.destroy({ id });
  }
}
