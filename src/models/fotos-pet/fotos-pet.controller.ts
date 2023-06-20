import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FotosPetService } from './fotos-pet.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../common/middleware/edit.filename';
import { FotosPet } from './entities/fotos-pet.entity';

@Controller('fotos-pet')
export class FotosPetController {
  constructor(private readonly fotosPetService: FotosPetService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/models/aws/files',
        filename: editFileName,
      }),
    }),
  )
  async store(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Partial<FotosPet>,
  ) {
    try {
      return this.fotosPetService.create(file, body);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
