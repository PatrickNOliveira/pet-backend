import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { ClinicaModule } from '../clinica/clinica.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { EnderecoModule } from '../endereco/endereco.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    ClinicaModule,
    TelefoneModule,
    EnderecoModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
