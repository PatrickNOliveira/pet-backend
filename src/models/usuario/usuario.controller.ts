import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FindAllParams } from '../../common/types/FindAllParams';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Like } from 'typeorm';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { Usuario } from './usuario.entity';
import { GetOneDto } from '../../common/validators/get.one.dto';
import { CreateUsuarioDto } from './dto/create.usuario.dto';
import * as argon2 from 'argon2';
import { UpdateUsuarioDto } from './dto/update.usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getAll(
    @Query() query: FindAllParams,
  ): Promise<IResponsePadrao<Usuario[]>> {
    try {
      return await this.usuarioService.getAll({
        take: query.take,
        page: query.page,
        where: query.search
          ? {
              nome: Like(`${query.search}%`),
              active: true,
            }
          : {
              active: true,
            },
        order: {
          nome: 'ASC',
        },
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Get(':id')
  async show(@Param() params: GetOneDto): Promise<IResponsePadrao<Usuario>> {
    try {
      return await this.usuarioService.show(params.id);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Post()
  async store(
    @Body() body: CreateUsuarioDto,
  ): Promise<IResponsePadrao<Usuario>> {
    try {
      body.senha = await argon2.hash(body.senha);
      return await this.usuarioService.store(body, true, [
        {
          value: body.email,
          columnName: 'email',
        },
        {
          value: body.login,
          columnName: 'login',
        },
      ]);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Patch(':id/desativar')
  async disable(@Param() params: GetOneDto): Promise<IResponsePadrao<Usuario>> {
    try {
      const response = await this.usuarioService.update({
        condition: {
          id: params.id,
        },
        body: {
          active: false,
        },
      });
      return {
        ...response,
        message: ['Desativado com sucesso.'],
      };
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Patch(':id/reativar')
  async enable(@Param() params: GetOneDto): Promise<IResponsePadrao<Usuario>> {
    try {
      const response = await this.usuarioService.update({
        condition: {
          id: params.id,
        },
        body: {
          active: true,
        },
      });
      return {
        ...response,
        message: ['Reativado com sucesso.'],
      };
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @Put(':id')
  async update(
    @Param() params: GetOneDto,
    @Body() body: UpdateUsuarioDto,
  ): Promise<IResponsePadrao<Usuario>> {
    try {
      return await this.usuarioService.update({
        condition: {
          id: params.id,
        },
        body,
        validateUnique: true,
        validateUniqueValues: [
          {
            value: body.email,
            columnName: 'email',
          },
          {
            value: body.login,
            columnName: 'login',
          },
        ],
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
