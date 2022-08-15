import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';
import { EscopoUsuario } from '../../../common/types/EscopoUsuario';

export class UpdateUsuarioDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({
    message: DefaultMessages.NAME_STRING,
  })
  @Length(1, 254, {
    message: DefaultMessages.NAME_LENGTH,
  })
  nome: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString({
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  @Length(11, 11, {
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  telefone: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({
    message: 'Campo login deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo login deve ter entre 1 e 254 caracteres',
  })
  login: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({
    message: 'Campo senha deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo senha deve ter entre 1 e 254 caracteres',
  })
  senha: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

  @IsOptional()
  @IsUUID(4, {
    message: 'empresaId deve ser um uuid',
  })
  empresaId: string;
}
