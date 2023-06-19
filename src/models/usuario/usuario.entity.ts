import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';
import { TipoPessoa } from '../../common/types/TipoPessoa';
import { Clinica } from '../clinica/entities/clinica.entity';
import { Telefone } from '../telefone/entities/telefone.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Pet } from '../pet/entities/pet.entity';

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

  @OneToMany(() => Clinica, (c) => c.usuario)
  clinicas?: Clinica[];

  @OneToMany(() => Telefone, (t) => t.usuario)
  telefones?: Telefone[];

  @OneToMany(() => Endereco, (e) => e.usuario)
  enderecos?: Endereco[];

  @OneToMany(() => Pet, (e) => e.usuario)
  pets?: Pet[];
}
