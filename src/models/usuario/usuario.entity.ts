import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254 })
  nome: string;

  @Column({ length: 10 })
  telefone: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 254 })
  login: string;

  @Column({ length: 254 })
  senha: string;

  @Column({
    type: 'enum',
    enum: EscopoUsuario,
  })
  escopo: EscopoUsuario;

  @Column({ length: 254 })
  refreshToken: string;
}
