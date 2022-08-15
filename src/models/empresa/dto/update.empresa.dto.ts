import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmpresaDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: DefaultMessages.NAME_STRING,
  })
  @Length(1, 254, {
    message: DefaultMessages.NAME_LENGTH,
  })
  nome: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo endereco deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo endereco deve ter entre 1 e 254 caracteres',
  })
  endereco: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo cidade deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo cidade deve ter entre 1 e 254 caracteres',
  })
  cidade: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
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

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo pais deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo pais deve ter entre 1 e 254 caracteres',
  })
  pais: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo polo deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo polo deve ter entre 1 e 254 caracteres',
  })
  polo: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo responsavel deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo responsavel deve ter entre 1 e 254 caracteres',
  })
  responsavel: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumberString({
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  @Length(11, 11, {
    message: DefaultMessages.INVALID_PHONE_FORMAT,
  })
  telefone: string;

  @ApiProperty({
    required: false,
  })
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

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  statusAptidaoFinal?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'Campo outrasNormasTenicas deve ser uma string',
  })
  @Length(1, 254, {
    message: 'Campo outrasNormasTenicas deve ter entre 1 e 254 caracteres',
  })
  outrasNormasTenicas: string;
}
