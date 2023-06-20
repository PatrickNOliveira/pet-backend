import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClinicaDto {
  @IsNotEmpty({
    message: 'O nome da clínica é obrigatório',
  })
  nome: string;

  @IsNotEmpty({
    message: 'O cnpj da clínica é obrigatório',
  })
  @IsNumberString(
    {},
    {
      message: 'CNPJ da clínica deve ser numérico',
    },
  )
  @MinLength(14, {
    message:
      'CNPJ da clínica deve ter exatamente 14 caracteres, o formato deve ser sem máscara. Ex: 00000000000000',
  })
  @MaxLength(14, {
    message:
      'CNPJ da clínica deve ter exatamente 14 caracteres, o formato deve ser sem máscara. Ex: 00000000000000',
  })
  cpfcnpj: string;

  @IsOptional()
  inscMunicipal: string;

  @IsNotEmpty({
    message: 'O cep da clínica é obrigatório',
  })
  @IsNumberString(
    {},
    {
      message: 'Cep da clínica deve ser numérico',
    },
  )
  @MinLength(8, {
    message:
      'Cep da clínica deve ter exatamente 8 caracteres, o formato deve ser sem máscara. Ex: 00000000',
  })
  @MaxLength(8, {
    message:
      'Cep da clínica deve ter exatamente 8 caracteres, o formato deve ser sem máscara. Ex: 00000000',
  })
  cep: string;

  @IsNotEmpty({
    message: 'O logradouro da clínica é obrigatório',
  })
  logradouro: string;

  @IsNotEmpty({
    message: 'O bairro da clínica é obrigatório',
  })
  bairro: string;

  @IsNotEmpty({
    message: 'A cidade da clínica é obrigatório',
  })
  cidade: string;

  @IsOptional()
  complemento: string;

  @IsNotEmpty({
    message: 'A uf da clínica é obrigatório',
  })
  uf: string;

  @IsNotEmpty({
    message: 'O numero da clínica é obrigatório',
  })
  numero: string;

  @IsNotEmpty({
    message: 'O telefone1 da clínica é obrigatório',
  })
  telefone1: string;

  @IsOptional()
  telefone2: string;

  @IsOptional()
  telefone3: string;

  @IsOptional()
  site: string;

  @IsOptional()
  email: string;

  @IsOptional()
  logo: string;
}
