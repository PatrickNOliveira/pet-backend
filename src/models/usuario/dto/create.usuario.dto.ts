import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';
import { TipoPessoa } from '../../../common/types/TipoPessoa';
import { EscopoUsuario } from '../../../common/types/EscopoUsuario';
import { Type } from 'class-transformer';

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
    message: 'Campo sobrenome é obrigatório',
  })
  @IsString({
    message: 'Campo sobrenome deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo sobrenome deve ter no máximo 254 caracteres',
  })
  sobrenome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo tipo é obrigatório',
  })
  @IsIn([TipoPessoa.PF, TipoPessoa.PJ], {
    message: `O campo tipo deve ser ${TipoPessoa.PJ} ou ${TipoPessoa.PF}`,
  })
  tipo: TipoPessoa;

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
    message: 'Campo cpfcnpj é obrigatório',
  })
  @IsString({
    message: 'Campo cpfcnpj deve ser uma string',
  })
  @Length(1, 14, {
    message: 'Campo cpfcnpj deve ter no máximo 14 caracteres',
  })
  cpfcnpj: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Campo tipo é obrigatório',
  })
  @IsIn([EscopoUsuario.ADMIN, EscopoUsuario.CLIENTE, EscopoUsuario.CLINICA], {
    message: `O campo escopo deve ser ${EscopoUsuario.ADMIN} ou ${EscopoUsuario.CLIENTE} ou ${EscopoUsuario.CLINICA}`,
  })
  escopo: EscopoUsuario;

  @ValidateIf((o) => o.escopo === EscopoUsuario.CLINICA)
  /*@Type(() => CreateClinicaDto)*/
  clinica: any;
}
