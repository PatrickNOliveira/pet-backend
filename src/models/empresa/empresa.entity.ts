import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('Empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 254 })
  nome: string;

  @Column({ length: 254 })
  endereco: string;

  @Column({ length: 254 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 254 })
  pais: string;

  @Column({ length: 254 })
  polo: string;

  @Column({ length: 254 })
  responsavel: string;

  @Column({ length: 10 })
  telefone: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 254 })
  outrasNormasTenicas?: string;

  @Column({ length: 254 })
  statusAptidaoFinal?: string;

  @OneToMany(() => Usuario, (usuario) => usuario.empresaGestorSGS, {
    nullable: true,
  })
  usuarioGestorSGS?: Usuario[];
}
