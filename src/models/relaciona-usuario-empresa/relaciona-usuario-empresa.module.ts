import { Module } from '@nestjs/common';
import { RelacionaUsuarioEmpresaService } from './relaciona-usuario-empresa.service';
import { RelacionaUsuarioEmpresaController } from './relaciona-usuario-empresa.controller';

@Module({
  providers: [RelacionaUsuarioEmpresaService],
  controllers: [RelacionaUsuarioEmpresaController]
})
export class RelacionaUsuarioEmpresaModule {}
