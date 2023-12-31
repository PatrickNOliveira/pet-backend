import { Module } from '@nestjs/common';
import { TelefoneService } from './telefone.service';
import { TelefoneController } from './telefone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telefone } from './entities/telefone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Telefone])],
  controllers: [TelefoneController],
  providers: [TelefoneService],
  exports: [TelefoneService],
})
export class TelefoneModule {}
