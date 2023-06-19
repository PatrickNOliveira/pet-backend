import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plano } from './entities/plano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plano])],
  controllers: [PlanoController],
  providers: [PlanoService],
  exports: [PlanoService],
})
export class PlanoModule {}
