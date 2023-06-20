import { EspecieAnimal } from '../../../common/types/EspecieAnimal';
import { IsEmpty, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty({
    message: 'É obrigatório enviar o nome do animal',
  })
  nome: string;

  @IsOptional()
  nascimento: string;

  @IsNotEmpty({
    message: 'É obrigatório enviar a pelagem do animal',
  })
  pelagem: string;

  @IsNotEmpty({
    message: 'É obrigatório enviar a cor da pelagem do animal',
  })
  corPelagem: string;

  @IsNotEmpty({
    message: 'É obrigatório enviar a espécie do animal',
  })
  @IsIn([EspecieAnimal.Gato, EspecieAnimal.Cachorro], {
    message: `A espécie deve ser ${EspecieAnimal.Gato} ou ${EspecieAnimal.Cachorro}`,
  })
  especie: EspecieAnimal;

  @IsNotEmpty({
    message: 'É obrigatório enviar a raça do animal',
  })
  raca: string;

  @IsOptional()
  castrado: boolean;

  @IsOptional()
  vivo: boolean;

  @IsEmpty({
    message: 'O microchip será inserido automaticamente',
  })
  microchip: string;

  @IsOptional()
  obs: string;
}
