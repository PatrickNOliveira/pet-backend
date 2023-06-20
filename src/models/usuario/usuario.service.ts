import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from '../../common/utils/service.base';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../../common/types/ResponsePadrao';
import * as argon2 from 'argon2';
import { CreateUsuarioDto } from './dto/create.usuario.dto';
import { DefaultMessages } from '../../common/types/DefaultMessages';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { UpdateUsuarioDto } from './dto/update.usuario.dto';
import { ClinicaService } from '../clinica/clinica.service';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';
import { TelefoneService } from '../telefone/telefone.service';
import { EnderecoService } from '../endereco/endereco.service';

@Injectable()
export class UsuarioService extends ServiceBase<Usuario> {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private clinicaService: ClinicaService,
    private telefoneService: TelefoneService,
    private enderecoService: EnderecoService,
  ) {
    super(usuarioRepository);
  }

  public async findByEmail(email: string): Promise<Usuario> {
    return await this.repository.findOne({
      where: { email },
      select: ['id', 'senha', 'nome', 'email', 'escopo'],
    });
  }

  async create(body: CreateUsuarioDto): Promise<IResponsePadrao<Usuario>> {
    await this.validateUnique({
      value: body.email,
      columnName: 'email',
    });
    body.senha = await argon2.hash(body.senha);
    const data = await this.repository.insert(body);
    const novoId = data.identifiers[0].id;
    if (body.escopo === EscopoUsuario.CLINICA) {
      await this.clinicaService.store({
        ...body.clinica,
        usuarioId: novoId,
      });
    }
    if (body.escopo === EscopoUsuario.CLIENTE) {
      for (const endereco of body.enderecos) {
        await this.enderecoService.store({ ...endereco, usuarioId: novoId });
      }
      for (const telefone of body.telefones) {
        await this.telefoneService.store({ ...telefone, usuarioId: novoId });
      }
    }
    const returnData = await this.repository.findOne({
      where: { id: novoId },
      relations: ['clinicas', 'telefones', 'enderecos'],
    });
    return {
      error: false,
      message: [DefaultMessages.CREATED],
      data: returnData,
    };
  }

  async edit(input: {
    condition:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Usuario>;
    body: UpdateUsuarioDto;
  }): Promise<IResponsePadrao<Usuario>> {
    await this.validateUnique({
      value: input.body.email,
      columnName: 'email',
      updating: true,
      condition: input.condition,
    });
    const dadosEdicao = input.body;
    const result = await this.repository.update(input.condition, dadosEdicao);
    if (result.affected > 0) {
      const data = await this.repository.findOne({
        where: input.condition as any,
      });
      return {
        error: false,
        message: [DefaultMessages.UPDATED],
        data: data,
      };
    }
    throw new HttpException(
      {
        error: true,
        message: [DefaultMessages.DATA_NOT_FOUND],
        data: null,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
