import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';
import { TipoPessoa } from '../../common/types/TipoPessoa';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254 })
  nome: string;

  @Column({ length: 254 })
  sobrenome: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 254, select: false })
  senha: string;

  @Column({
    type: 'enum',
    enum: EscopoUsuario,
  })
  escopo: EscopoUsuario;

  @Column({
    type: 'enum',
    enum: TipoPessoa,
  })
  tipo: TipoPessoa;

  @Column()
  nascimento: string;

  @Column({ length: 14 })
  cpfcnpj: string;

  @Column({ length: 254 })
  rg: string;

  @Column({ length: 254 })
  conjugue: string;

  @Column({ length: 254 })
  comoConheceu: string;

  @Column({ length: 6 })
  codigoRecuperarSenha?: string;

  @Column()
  codigoSenhaExpiracao: string;

  @Column({ length: 254 })
  mercadoPagoId: string;
}
