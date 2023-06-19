import { Module } from '@nestjs/common';
import { FotosPetService } from './fotos-pet.service';
import { FotosPetController } from './fotos-pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotosPet } from './entities/fotos-pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FotosPet])],
  controllers: [FotosPetController],
  providers: [FotosPetService],
  exports: [FotosPetService],
})
export class FotosPetModule {}
