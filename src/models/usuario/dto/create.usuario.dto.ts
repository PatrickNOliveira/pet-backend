import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';

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
}
