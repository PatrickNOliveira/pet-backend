import { Controller, Get } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async getAll(): Promise<any> {
    try {
      return await this.empresaService.getAll({
        take: 2,
        page: 1,
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
