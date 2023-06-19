import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planoService.store(createPlanoDto);
  }

  @Get()
  findAll() {
    return this.planoService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planoService.update({
      condition: { id },
      body: updatePlanoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planoService.destroy({ id });
  }
}
