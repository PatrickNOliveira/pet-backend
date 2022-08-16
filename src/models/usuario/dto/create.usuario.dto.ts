import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';
import { EscopoUsuario } from '../../../common/types/EscopoUsuario';

export class CreateUsuarioDto {
  id?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: DefaultMessages.NAME_REQUIRED,
  })
  @IsString({
    message: DefaultMessages.NAME_STRING,
  })
  @Length(1, 254, {
    message: DefaultMessages.NAME_LENGTH,
  })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo telefone é obrigatório',
  })
  @IsNumberString({
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  @Length(11, 11, {
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  telefone: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo email é obrigatório',
  })
  @IsString({
    message: 'Campo email deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo email deve ter entre 1 e 254 caracteres',
  })
  @IsEmail(
    {},
    {
      message: DefaultMessages.INVALID_EMAIL_FORMAT,
    },
  )
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo login é obrigatório',
  })
  @IsString({
    message: 'Campo login deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo login deve ter entre 1 e 254 caracteres',
  })
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo senha é obrigatório',
  })
  @IsString({
    message: 'Campo senha deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo senha deve ter entre 1 e 254 caracteres',
  })
  senha: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo escopo é obrigatório',
  })
  @IsString({
    message: 'Campo escopo deve ser uma string',
  })
  @IsIn(
    [
      EscopoUsuario.AUDITOR_MASTER,
      EscopoUsuario.GESTOR,
      EscopoUsuario.CONSULTOR,
    ],
    {
      message: `O escopo deve ser obrigatoriamente um dos 3 valores a seguir: ${EscopoUsuario.AUDITOR_MASTER}, ${EscopoUsuario.GESTOR}, ${EscopoUsuario.CONSULTOR}`,
    },
  )
  escopo: EscopoUsuario;

  @IsEmpty({
    message: 'O campo refreshToken deve estar vazio',
  })
  refreshToken?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.escopo === EscopoUsuario.GESTOR)
  @IsUUID(4, {
    message: 'empresaId deve ser um uuid',
  })
  @IsNotEmpty({
    message: `O campo empresaId é obrigatório para usuários com o escopo ${EscopoUsuario.GESTOR}`,
  })
  empresaId: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.escopo === EscopoUsuario.CONSULTOR)
  @IsUUID(4, {
    message: 'empresasRelacionadas deve ser um array de uuids',
    each: true,
  })
  @IsNotEmpty({
    message: `O campo empresasRelacionadas é obrigatório para usuários com o escopo ${EscopoUsuario.CONSULTOR}`,
  })
  empresasRelacionadas: string[];
}
