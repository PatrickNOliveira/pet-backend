import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EscopoUsuario } from '../../common/types/EscopoUsuario';
import { Empresa } from '../empresa/empresa.entity';

@Entity('Usuarios')
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

  @Column({ length: 254, select: false })
  senha: string;

  @Column({
    type: 'enum',
    enum: EscopoUsuario,
  })
  escopo: EscopoUsuario;

  @Column({ length: 254, nullable: true })
  refreshToken?: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuarioGestorSGS, {
    nullable: true,
  })
  @JoinColumn({ name: 'empresaId' })
  empresaGestorSGS?: Empresa;
}
