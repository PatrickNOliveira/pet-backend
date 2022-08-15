import { Controller, Get } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async getAll(): Promise<any> {
    try {
      return await this.empresaService.getAll();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}
