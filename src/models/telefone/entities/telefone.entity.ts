import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Usuario} from "../../usuario/usuario.entity";

@Entity('Telefones')
export class Telefone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 2 })
  ddd: string;

  @Column({ length: 9 })
  numero: string;

  @Column()
  nomeContato: string;

  @Column('uuid')
  usuarioId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.telefones)
  @JoinColumn({ name: 'usuarioid' })
  usuario: Usuario;
}
