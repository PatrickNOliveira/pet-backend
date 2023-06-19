import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.store(createPetDto);
  }

  @Get()
  findAll() {
    return this.petService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update({
      condition: { id },
      body: updatePetDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.destroy({ id });
  }
}
