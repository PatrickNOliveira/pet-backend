import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty({
    message: 'O cep do endereço é obrigatório',
  })
  @IsNumberString(
    {},
    {
      message: 'Cep do endereço deve ser numérico',
    },
  )
  @MinLength(8, {
    message:
      'Cep do endereço deve ter exatamente 8 caracteres, o formato deve ser sem máscara. Ex: 00000000',
  })
  @MaxLength(8, {
    message:
      'Cep do endereço deve ter exatamente 8 caracteres, o formato deve ser sem máscara. Ex: 00000000',
  })
  cep: string;

  @IsNotEmpty({
    message: 'O logradouro do endereço é obrigatório',
  })
  logradouro: string;

  @IsNotEmpty({
    message: 'O bairro do endereço é obrigatório',
  })
  bairro: string;

  @IsNotEmpty({
    message: 'A cidade do endereço é obrigatório',
  })
  cidade: string;

  @IsOptional()
  complemento: string;

  @IsNotEmpty({
    message: 'A uf do endereço é obrigatório',
  })
  uf: string;

  @IsNotEmpty({
    message: 'O numero do endereço é obrigatório',
  })
  numero: string;
}
