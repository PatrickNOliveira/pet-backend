import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { DefaultMessages } from '../../../common/types/DefaultMessages';

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

  email: string;
}
