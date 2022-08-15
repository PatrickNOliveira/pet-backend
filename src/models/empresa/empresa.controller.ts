import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { FindAllParams } from '../../common/types/FindAllParams';
import { Like } from 'typeorm';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto } from './dto/create.empresa.dto';
import { GetOneDto } from '../../common/validators/get.one.dto';

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

  @Get(':id')
  async show(@Param() params: GetOneDto): Promise<IResponsePadrao<Empresa>> {
    try {
      return await this.empresaService.show(params.id);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
