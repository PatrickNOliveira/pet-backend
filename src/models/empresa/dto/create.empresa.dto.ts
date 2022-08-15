import {
  IsEmail,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';

export class CreateEmpresaDto {
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

  @IsNotEmpty({
    message: 'Campo endereco é obrigatório',
  })
  @IsString({
    message: 'Campo endereco deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo endereco deve ter entre 1 e 254 caracteres',
  })
  endereco: string;

  @IsNotEmpty({
    message: 'Campo cidade é obrigatório',
  })
  @IsString({
    message: 'Campo cidade deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo cidade deve ter entre 1 e 254 caracteres',
  })
  cidade: string;

  @IsNotEmpty({
    message: 'Campo estado é obrigatório',
  })
  @IsString({
    message: 'Campo estado deve ser uma string',
  })
  @IsIn(
    [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
      'ESTRANGEIRO',
    ],
    {
      message:
        'Estado deve ser a sigla do estado do Brasil. Ex: RJ, SP, etc. Ou ESTRANGEIRO para estrangeiros',
    },
  )
  estado: string;

  @IsNotEmpty({
    message: 'Campo pais é obrigatório',
  })
  @IsString({
    message: 'Campo pais deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo pais deve ter entre 1 e 254 caracteres',
  })
  pais: string;

  @IsNotEmpty({
    message: 'Campo polo é obrigatório',
  })
  @IsString({
    message: 'Campo polo deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo polo deve ter entre 1 e 254 caracteres',
  })
  polo: string;

  @IsNotEmpty({
    message: 'Campo responsavel é obrigatório',
  })
  @IsString({
    message: 'Campo responsavel deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo responsavel deve ter entre 1 e 254 caracteres',
  })
  responsavel: string;

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

  @IsEmpty({
    message: 'O campo statusAptidaoFinal não pode ser preenchido no cadastro',
  })
  statusAptidaoFinal?: string;

  @IsOptional()
  @IsString({
    message: 'Campo outrasNormasTenicas deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo outrasNormasTenicas deve ter entre 1 e 254 caracteres',
  })
  outrasNormasTenicas: string;
}
