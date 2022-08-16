import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { FindAllParams } from '../../common/types/FindAllParams';
import { Like } from 'typeorm';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Empresa } from './empresa.entity';
import { CreateEmpresaDto } from './dto/create.empresa.dto';
import { GetOneDto } from '../../common/validators/get.one.dto';
import { UpdateEmpresaDto } from './dto/update.empresa.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get(':id')
  async show(@Param() params: GetOneDto): Promise<IResponsePadrao<Empresa>> {
    try {
      return await this.empresaService.show(params.id);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  async destroy(@Param() params: GetOneDto): Promise<IResponsePadrao<Empresa>> {
    try {
      return await this.empresaService.destroy({ id: params.id });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param() params: GetOneDto,
    @Body() body: UpdateEmpresaDto,
  ): Promise<IResponsePadrao<Empresa>> {
    try {
      return await this.empresaService.update({
        condition: { id: params.id },
        body,
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
