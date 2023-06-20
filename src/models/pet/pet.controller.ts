import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { RequestUser } from '../../common/types/auth/request';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @Request() req: RequestUser) {
    try {
      return this.petService.store({
        ...createPetDto,
        usuarioId: req.user.id,
        microchip: this.generateRandomString(12),
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Get()
  findAll(@Request() req: RequestUser) {
    try {
      return this.petService.getAll({
        where: {
          usuarioId: req.user.id,
        },
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
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

  private generateRandomString(size: number): string {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < size; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return randomString;
  }
}
