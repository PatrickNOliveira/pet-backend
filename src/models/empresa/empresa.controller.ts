import { Controller, Get, Query } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { FindAllParams } from '../../common/types/FindAllParams';
import { Like } from 'typeorm';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async getAll(@Query() query: FindAllParams): Promise<any> {
    try {
      return await this.empresaService.getAll({
        take: query.take,
        page: query.page,
        where: query.search
          ? {
              nome: Like(`${query.search}%`),
            }
          : undefined,
        order: {
          nome: 'ASC',
        },
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
