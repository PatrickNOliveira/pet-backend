import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/usuario.entity';

@Entity('Enderecos')
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ length: 2 })
  uf: string;

  @Column()
  numero: string;

  @Column('uuid')
  usuarioId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.enderecos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;
}
