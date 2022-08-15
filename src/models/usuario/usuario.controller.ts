import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FindAllParams } from '../../common/types/FindAllParams';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Like } from 'typeorm';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { Usuario } from './usuario.entity';
import { GetOneDto } from '../../common/validators/get.one.dto';
import { CreateUsuarioDto } from './dto/create.usuario.dto';
import * as argon2 from 'argon2';

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
}
