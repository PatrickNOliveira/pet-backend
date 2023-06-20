import { IsNotEmpty } from 'class-validator';

export class CreateTelefoneDto {
  @IsNotEmpty({
    message: 'ddd do telefone é obrigatório',
  })
  ddd: string;

  @IsNotEmpty({
    message: 'numero do telefone é obrigatório',
  })
  numero: string;

  @IsNotEmpty({
    message: 'nome de contato do telefone é obrigatório',
  })
  nomeContato: string;
}
