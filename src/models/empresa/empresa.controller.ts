import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { FindAllParams } from '../../common/types/FindAllParams';
import { Like } from 'typeorm';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto } from './dto/create.empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async getAll(
    @Query() query: FindAllParams,
  ): Promise<IResponsePadrao<Empresa[]>> {
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

  @Post()
  async store(
    @Body() body: CreateEmpresaDto,
  ): Promise<IResponsePadrao<Empresa>> {
    try {
      return await this.empresaService.store(body);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
