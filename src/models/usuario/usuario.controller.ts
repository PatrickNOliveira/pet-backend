import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FindAllParams } from '../../common/types/FindAllParams';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { Like } from 'typeorm';
import { tratamentoErroPadrao } from '../../common/utils/tratamentoErroPadrao';
import { Usuario } from './usuario.entity';
import { GetOneDto } from '../../common/validators/get.one.dto';
import { CreateUsuarioDto } from './dto/create.usuario.dto';
import { UpdateUsuarioDto } from './dto/update.usuario.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../../auth/isPublic';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post('/forgot-my-password')
  async sendForgotPasswordMail(@Body() body: ForgotPasswordDto) {
    try {
      return this.usuarioService.sendForgotpasswordEmail(body.email);
    } catch (error) {
      return tratamentoErroPadrao(error);
    }
  }

  @Public()
  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    try {
      return this.usuarioService.resetPassword(body);
    } catch (error) {
      return tratamentoErroPadrao(error);
    }
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get(':id')
  async show(@Param() params: GetOneDto): Promise<IResponsePadrao<Usuario>> {
    try {
      return await this.usuarioService.show(params.id, [
        'empresaConsultorSGS',
        'empresaGestorSGS',
      ]);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @ApiBearerAuth()
  @Post()
  @Public()
  async store(
    @Body() body: CreateUsuarioDto,
  ): Promise<IResponsePadrao<Usuario>> {
    try {
      return await this.usuarioService.create(body);
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param() params: GetOneDto,
    @Body() body: UpdateUsuarioDto,
  ): Promise<IResponsePadrao<Usuario>> {
    try {
      return await this.usuarioService.edit({
        condition: {
          id: params.id,
        },
        body,
      });
    } catch (e) {
      tratamentoErroPadrao(e);
    }
  }
}
