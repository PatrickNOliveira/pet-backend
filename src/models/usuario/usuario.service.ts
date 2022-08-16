import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';
import * as argon2 from 'argon2';
import { CreateUsuarioDto } from './dto/create.usuario.dto';
import { DefaultMessages } from '../../common/types/DefaultMessages';
import { EmpresaService } from '../empresa/empresa.service';

@Injectable()
export class UsuarioService extends ServiceBase<Usuario> {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly empresaService: EmpresaService,
  ) {
    super(usuarioRepository);
  }

  override async store(
    body: CreateUsuarioDto,
  ): Promise<IResponsePadrao<Usuario>> {
    body.senha = await argon2.hash(body.senha);
    await this.validateUnique({
      value: body.email,
      columnName: 'email',
    });
    await this.validateUnique({
      value: body.login,
      columnName: 'login',
    });

    if (body.empresaId) {
      const response = await this.empresaService.exists(body.empresaId);
      if (!response) {
        throw new HttpException(
          {
            error: true,
            message: [
              `Nenhum id com o valor ${body.empresaId} encontrado, portanto, não foi possível realizar o relacionamento`,
            ],
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (body.escopo !== EscopoUsuario.GESTOR && body.empresaId) {
      throw new HttpException(
        {
          error: true,
          message: `Apenas usuários do tipo ${EscopoUsuario.GESTOR} podem ter um empresaId`,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (body.escopo !== EscopoUsuario.CONSULTOR && body.empresasRelacionadas) {
      throw new HttpException(
        {
          error: true,
          message: `Apenas usuários do tipo ${EscopoUsuario.CONSULTOR} podem ter empresas relacionadas`,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.repository.insert(body);
    const novoId = data.identifiers[0].id;
    const returnData = await this.repository.findOne({
      where: { id: novoId },
      relations: ['empresaConsultorSGS'],
    });
    if (body.empresasRelacionadas && body.empresasRelacionadas?.length > 0) {
      for (const item of body.empresasRelacionadas) {
        const empresa = (await this.empresaService.show(item)).data;
        returnData.empresaConsultorSGS.push(empresa);
        await this.repository.save(returnData);
      }
    }
    return {
      error: false,
      message: [DefaultMessages.CREATED],
      data: returnData,
    };
  }
}
